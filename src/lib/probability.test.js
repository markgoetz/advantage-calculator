import probability from './probability';

const { getProbability, getProbabilityWithDisadvantage, getProbabilityWithAdvantage } = probability;

describe('getProbability', () => {
    it('calculates the die roll successfully', () => {
        expect(getProbability(0, 20, false)).toEqual(0.05);
        expect(getProbability(9, 20, false)).toEqual(0.5);
        expect(getProbability(19, 20, false)).toEqual(1);
    });

    it('clamps the probability to between 0 and 1', () => {
        expect(getProbability(-5, 20, false)).toEqual(0);
        expect(getProbability(35, 20, false)).toEqual(1);
    });

    it('calculates crit chance correctly', () => {
        expect(getProbability(-5, 20, true)).toEqual(0.05);
        expect(getProbability(35, 20, true)).toEqual(0.95);
    });
});

describe('getProbabilityWithDisadvantage', () => {
    it('calculates the die roll successfully', () => {
        expect(getProbabilityWithDisadvantage(-1, 20, false)).toEqual(0);
        expect(getProbabilityWithDisadvantage(19, 20, false)).toEqual(1);

        expect(getProbabilityWithDisadvantage(1, 20, false)).toBeCloseTo(0.01);
        expect(getProbabilityWithDisadvantage(4, 20, false)).toBeCloseTo(0.0625);
    });

    it('calculates crit chance correctly', () => {
        expect(getProbabilityWithDisadvantage(-5, 20, true)).toBeCloseTo(0.0025);
        expect(getProbabilityWithDisadvantage(35, 20, true)).toBeCloseTo(0.9025);
    });
});

describe('getProbabilityWithAdvantage', () => {
    it('calculates the die roll successfully', () => {
        expect(getProbabilityWithAdvantage(-1, 20, false)).toEqual(0);
        expect(getProbabilityWithAdvantage(19, 20, false)).toEqual(1);

        expect(getProbabilityWithAdvantage(1, 20, false)).toBeCloseTo(0.19);
        expect(getProbabilityWithAdvantage(4, 20, false)).toBeCloseTo(0.4375);
    });

    it('calculates crit chance correctly', () => {
        expect(getProbabilityWithAdvantage(-5, 20, true)).toBeCloseTo(0.1025);
        expect(getProbabilityWithAdvantage(35, 20, true)).toBeCloseTo(0.9975);
    });
});
