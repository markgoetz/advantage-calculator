<template>
    <div class="c-dark-box u-full-height">
        <div class="o-vertical">
            <h2 class="o-vertical__static">
                <div class="c-hdg c-hdg--1 u-text-center" style="margin-bottom:10px;">
                    {{ (this.use === 'dc') ? 'DC Rating' : 'Die Roll Modifier' }}
                </div>
                <div class="o-vr"></div>
            </h2>
            <div class="o-vertical__grow">
                <table class="c-graph">
                    <caption class="c-graph__caption">
                        Advantage / Disadvantage by {{ (this.use === 'dc') ? 'DC Rating' : 'Die Roll Modifier' }}
                    </caption>
                    <thead class="c-graph__hd">
                        <tr>
                            <th scope="col">Skill Check DC</th>
                            <th scope="col">Advantage</th>
                            <th scope="col">No advantage or disadvantage</th>
                            <th scope="col">Disadvantage</th>
                        </tr>
                    </thead>
                    <tbody class="c-graph__bd">
                        <tr class="c-graph__col" v-for="value in values" :key="use + value.label">
                            <th scope="row" class="c-graph__col-hd">{{ value.label }}</th>
                            <td class="c-graph__cell" :style="getStyle(value.advantage)">
                                <div class="c-percentage c-percentage--positive">
                                    {{ formatPercentageWithCaps(value.advantage) }}
                                </div>
                            </td>
                            <td class="c-graph__cell" :style="getStyle(value.neutral)">
                                <div class="c-percentage c-percentage--neutral">
                                    {{ formatPercentageWithCaps(value.neutral) }}
                                </div>
                            </td>
                            <td class="c-graph__cell" :style="getStyle(value.disadvantage)">
                                <div class="c-percentage c-percentage--negative">
                                    {{ formatPercentageWithCaps(value.disadvantage) }}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Table',
    props: {
        use: String,
        columns: Array,
        values: Array,
    },
    methods: {
        formatPercentageWithCaps: function formatPercentageWithCaps(percentage) {
            if (percentage > 0.99 && percentage < 1) {
                return '>99%';
            }

            if (percentage < 0.01 && percentage > 0) {
                return '<1%';
            }

            return this.formatPercentage(percentage);
        },
        formatPercentage: function formatPercentage(percentage) {
            return `${Math.round(percentage * 100)}%`;
        },
        getStyle: function getStyle(percentage) {
            return `bottom: ${this.formatPercentage(percentage)}`;
        },
    },
};
</script>
