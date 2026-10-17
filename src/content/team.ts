import {
  portraitChristianHinterdorfer,
  portraitChristianHinterreiter,
  portraitMichaelHochstoeger,
} from "../assets/images";
import type { TeamMember } from "./types";

export const team: TeamMember[] = [
  {
    id: "michael-hochstoeger",
    name: "Michael Hochstöger",
    role: "Founder",
    email: "michael.hochstoeger@equicrew.com",
    portrait: portraitMichaelHochstoeger,
  },
  {
    id: "christian-hinterdorfer",
    name: "Christian Hinterdorfer",
    role: "Founder",
    email: "christian.hinterdorfer@equicrew.com",
    portrait: portraitChristianHinterdorfer,
  },
  {
    id: "christian-hinterreiter",
    name: "Christian Hinterreiter",
    role: "Founder",
    email: "christian.hinterreiter@equicrew.com",
    portrait: portraitChristianHinterreiter,
  },
];

export default team;
