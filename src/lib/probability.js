const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getProbability = (modifier, target, crits) => {
    const baseValue = (modifier + 21 - target) / 20;

    if (crits) {
        return clamp(baseValue, 0.05, 0.95);
    }

    return clamp(baseValue, 0, 1);
};

const getProbabilityWithDisadvantage = (modifier, target, crits) => {
    const probability = getProbability(modifier, target, crits);
    return probability * probability;
};

const getProbabilityWithAdvantage = (modifier, target, crits) => {
    const probability = getProbability(modifier, target, crits);
    return 2 * probability - (probability * probability);
};

export default { getProbability, getProbabilityWithDisadvantage, getProbabilityWithAdvantage };
