<template>
    <div>
        <form class="o-vr o-vr--x4">
            <fieldset>
                <legend><h2 class="c-hdg c-hdg--1 u-text-center">Settings</h2></legend>
                <div class="o-vr"></div>
                <div>
                    <label class="c-hdg c-hdg--2">Show percentages by</label>
                    <div class="c-toggle">
                        <input
                            type="radio"
                            name="percentages"
                            value="dc"
                            class="u-visuallyHidden"
                            id="percentages-dc"
                            :checked="use === 'dc'"
                            @click="onOptionChange"
                        />
                        <label class="c-toggle__option" for="percentages-dc">DC Rating</label>
                        <input
                            type="radio"
                            name="percentages"
                            value="modifier"
                            class="u-visuallyHidden"
                            id="percentages-modifier"
                            :checked="use === 'modifier'"
                            @click="onOptionChange"
                        />
                        <label class="c-toggle__option" for="percentages-modifier">Die Modifier</label>
                    </div>
                </div>
                <div class="o-vr o-vr--x3"></div>
                <div>
                    <label class="c-hdg c-hdg--2" for="modifier">
                        {{ (use === 'dc') ? 'Die Roll Modifier' : 'Ability Check DC' }}
                    </label>
                    <div class="o-h-list">
                        <input class="c-input" type="number" id="modifier" :value="value" @change="onValueChange" />
                        <button type="button" class="c-btn" @click="onIncrement">
                            <img src="assets/images/plus.svg" alt="Plus 1" />
                        </button>
                        <button type="button" class="c-btn" @click="onDecrement">
                            <img src="assets/images/minus.svg" alt="Minus 1" />
                        </button>
                    </div>
                </div>
                <div class="o-vr o-vr--x3"></div>
                <div>
                    <div class="o-h-list">
                        <input class="c-checkbox" type="checkbox" id="crit" :value="crits" @change="onCritChange" />
                        <label class="c-hdg c-hdg--2" for="crit">
                            Include critical success / fail
                        </label>
                    </div>
                </div>
            </fieldset>
        </form>
        <div class="c-dark-box">
            <h2 class="c-hdg c-hdg--1 u-text-center">Legend</h2>
            <div class="o-vr"></div>
            <ul class="o-v-list">
                <li>
                    <div class="o-media">
                        <div class="o-media__icon">
                            <div class="c-percentage c-percentage--positive">50%</div>
                        </div>
                        <div class="o-media__bd">
                            <span class="c-legend-text">
                                Success chance with advantage
                            </span>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="o-media">
                        <div class="o-media__icon">
                            <div class="c-percentage c-percentage--neutral">40%</div>
                        </div>
                        <div class="o-media__bd">
                            <span class="c-legend-text">
                                Success chance with neither advantage nor disadvantage
                            </span>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="o-media">
                        <div class="o-media__icon">
                            <div class="c-percentage c-percentage--negative">30%</div>
                        </div>
                        <div class="o-media__bd">
                            <span class="c-legend-text">Success chance with disadvantage</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Controls',
    props: {
        use: String,
        dc: Number,
        modifier: Number,
        crits: Boolean,
        onupdate: Function,
    },
    computed: {
        value: function value() {
            return (this.use === 'dc' ? this.modifier : this.dc);
        },
    },
    methods: {
        onOptionChange: function onOptionChange(event) {
            this.$props.onupdate('use', event.target.value);
        },
        onCritChange: function onCritChange(event) {
            this.$props.onupdate('crits', event.target.checked);
        },
        onValueChange: function onValueChange(event) {
            const fieldName = (this.use === 'dc' ? 'modifier' : 'dc');
            this.$props.onupdate(fieldName, Number(event.target.value));
        },
        onIncrement: function onIncrement() {
            if (this.use === 'dc') {
                this.$props.onupdate('modifier', this.modifier + 1);
            } else {
                this.$props.onupdate('dc', this.dc + 1);
            }
        },
        onDecrement: function onIncrement() {
            if (this.use === 'dc') {
                this.$props.onupdate('modifier', this.modifier - 1);
            } else {
                this.$props.onupdate('dc', this.dc - 1);
            }
        },
    },
};

</script>
