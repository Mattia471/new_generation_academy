import {ReactNode} from "react";

export interface ClassInfo {
    time: string;
    name: string;
    level: string;
}

export interface DaySchedule {
    day: string;
    classes: ClassInfo[];
}

export interface FreeTrialForm {
    name: string;
    surname: string;
    email: string;
    phone: string;
    day: string;
    message: string;
}

export interface TeamProjectForm {
    name: string;
    surname: string;
    email: string;
    phone: string;
}

export interface NavButtonProps {
    section: SectionType;
    icon: ReactNode;
    text: string;
    activeSection: string;
    onClick: (section: SectionType) => void;
}

export type SectionType = 'home' | 'corsi' | 'maestri' | 'contatti';