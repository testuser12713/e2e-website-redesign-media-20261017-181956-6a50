import type { ImageAsset } from "../content/types";
import cubeAvif from "./images/cube-1215.avif";
import cubeFallback from "./images/cube-1215.png";
import cubeWebp from "./images/cube-1215.webp";
import heroAvif from "./images/hero-2740.avif";
import heroFallback from "./images/hero-2740.jpg";
import heroWebp from "./images/hero-2740.webp";
import plantAvif from "./images/plant-1440.avif";
import plantFallback from "./images/plant-1440.jpg";
import plantWebp from "./images/plant-1440.webp";
import portraitHinterdorferAvif from "./images/portrait-christian-hinterdorfer-596.avif";
import portraitHinterdorferFallback from "./images/portrait-christian-hinterdorfer-596.jpg";
import portraitHinterdorferWebp from "./images/portrait-christian-hinterdorfer-596.webp";
import portraitHinterreiterAvif from "./images/portrait-christian-hinterreiter-596.avif";
import portraitHinterreiterFallback from "./images/portrait-christian-hinterreiter-596.jpg";
import portraitHinterreiterWebp from "./images/portrait-christian-hinterreiter-596.webp";
import portraitMichaelAvif from "./images/portrait-michael-596.avif";
import portraitMichaelFallback from "./images/portrait-michael-596.jpg";
import portraitMichaelWebp from "./images/portrait-michael-596.webp";
import referenceNeubauAvif from "./images/reference-neubau-1440.avif";
import referenceNeubauFallback from "./images/reference-neubau-1440.jpg";
import referenceNeubauWebp from "./images/reference-neubau-1440.webp";
import teamAvif from "./images/team-2228.avif";
import teamFallback from "./images/team-2228.jpg";
import teamWebp from "./images/team-2228.webp";

export const heroImage: ImageAsset = {
  avif: heroAvif,
  webp: heroWebp,
  fallback: heroFallback,
  width: 2740,
  height: 1864,
};

export const cubeImage: ImageAsset = {
  avif: cubeAvif,
  webp: cubeWebp,
  fallback: cubeFallback,
  width: 1215,
  height: 1215,
};

export const plantImage: ImageAsset = {
  avif: plantAvif,
  webp: plantWebp,
  fallback: plantFallback,
  width: 1440,
  height: 605,
};

export const teamGroupImage: ImageAsset = {
  avif: teamAvif,
  webp: teamWebp,
  fallback: teamFallback,
  width: 2228,
  height: 1294,
};

export const portraitMichaelHochstoeger: ImageAsset = {
  avif: portraitMichaelAvif,
  webp: portraitMichaelWebp,
  fallback: portraitMichaelFallback,
  width: 596,
  height: 686,
};

export const portraitChristianHinterdorfer: ImageAsset = {
  avif: portraitHinterdorferAvif,
  webp: portraitHinterdorferWebp,
  fallback: portraitHinterdorferFallback,
  width: 596,
  height: 686,
};

export const portraitChristianHinterreiter: ImageAsset = {
  avif: portraitHinterreiterAvif,
  webp: portraitHinterreiterWebp,
  fallback: portraitHinterreiterFallback,
  width: 596,
  height: 686,
};

export const references: ImageAsset[] = [
  {
    avif: referenceNeubauAvif,
    webp: referenceNeubauWebp,
    fallback: referenceNeubauFallback,
    width: 1440,
    height: 1348,
  },
  plantImage,
  heroImage,
];
