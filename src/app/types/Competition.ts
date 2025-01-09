type Competition = {
  id?: string;
  code: string;
  date: string;
  location: string;
  maxParticipants: number;
  minParticipants: number;
  openRegistration: boolean;
  speciesType: string;
  participantsCount?: number;
};

export default Competition;
