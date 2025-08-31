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

export interface FormData {
    name: string;
    email: string;
    phone: string;
    course: string;
    day: string;
    message: string;
}

export interface NavButtonProps {
    section: SectionType;
    icon: ReactNode;
    text: string;
    activeSection: string;
    onClick: (section: SectionType) => void;
}

export type SectionType = 'home' | 'corsi' | 'maestri' | 'contatti';