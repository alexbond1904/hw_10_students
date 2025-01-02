export interface Scores {
    "math": number,
    "eng": number,
    "art": number
}

export default class Student {
    private readonly _id: string;
    private _name: string;
    private _scores: Scores;


    constructor(id: string, name: string, scores: { math: number; eng: number; art: number }) {
        this._id = id;
        this._name = name;
        this._scores = scores;
    }


    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get scores(): { math: number; eng: number; art: number } {
        return this._scores;
    }

    set scores(value: { math: number; eng: number; art: number }) {
        this._scores = value;
    }
}