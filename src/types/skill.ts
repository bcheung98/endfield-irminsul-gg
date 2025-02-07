export interface Skill {
    name: string;
    description: string;
}

export interface SkillWithScaling extends Skill {
    scaling: string[][];
}

export interface SkillOptionalScaling extends Skill {
    scaling?: string[][];
}
