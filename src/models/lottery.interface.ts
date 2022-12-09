
export interface Lottery {
    tittle: string;
    participants: Participant[];
}

export interface Participant {
    name: string;
    email: string;
}

export interface LotteryResult {
    santa: Participant;
    nameParticipant: string;
}