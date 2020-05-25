<template>
    <div class="o-app">
        <header class="o-app__hd">
            <h1 class="u-text-center">
                <div class="c-brand">D20 Success Calculator</div>
                <div class="c-hdg c-hdg--2">for RPG systems</div>
            </h1>
        </header>
        <div class="o-app__bd">
            <div class="o-layout">
                <aside class="o-layout__sidebar">
                    <Controls
                        :use="use"
                        :dc="dc"
                        :modifier="modifier"
                        :crits="crits"
                        :onupdate="onupdate"
                    />
                </aside>
                <main class="o-layout__main">
                    <Table :use="use" :values="tableValues" />
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import Controls from './Controls.vue';
import Table from './Table.vue';
import probability from '../lib/probability';

const { getProbability, getProbabilityWithAdvantage, getProbabilityWithDisadvantage } = probability;

export default {
    name: 'Container',
    components: { Controls, Table },
    data: () => ({
        use: 'dc',
        dc: 15,
        modifier: 0,
        crits: false,
        dcColumns: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        modifierColumns: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    }),
    methods: {
        onupdate: function onupdate(fieldName, value) {
            this[fieldName] = value;
        },
    },
    computed: {
        tableValues: function tableValues() {
            const rows = [];

            if (this.use === 'dc') {
                this.dcColumns.forEach((column) => {
                    rows.push({
                        label: column,
                        neutral: getProbability(this.modifier, column, this.crits),
                        advantage: getProbabilityWithAdvantage(this.modifier, column, this.crits),
                        disadvantage: getProbabilityWithDisadvantage(this.modifier, column, this.crits),
                    });
                });
            } else {
                this.modifierColumns.forEach((column) => {
                    rows.push({
                        label: column,
                        neutral: getProbability(column, this.dc, this.crits),
                        advantage: getProbabilityWithAdvantage(column, this.dc, this.crits),
                        disadvantage: getProbabilityWithDisadvantage(column, this.dc, this.crits),
                    });
                });
            }

            return rows;
        },
    },
};
</script>
