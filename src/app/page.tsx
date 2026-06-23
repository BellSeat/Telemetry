import { Gallery, type CarCard } from "@/components/ui/gallery";

const CARS: CarCard[] = [
  {
    title: "HYUNDAI i20 N",
    subtitle: "Stage 7 · Monte Carlo",
    carSrc: "/carpicture/63a5fafe00b347ec949fb186c6790098.jpg",
    telemetry: { speed: 174, gear: 4, rpm: 7200, throttle: 82, brake: 0, lapTime: "1:42.318", topSpeed: 196 },
  },
  {
    title: "SUBARU WRX",
    subtitle: "New England Forest",
    carSrc: "/carpicture/trevorlyden-23r-testing-32072_blog.webp",
    telemetry: { speed: 138, gear: 3, rpm: 6400, throttle: 95, brake: 0, lapTime: "2:01.774", topSpeed: 181 },
  },
  {
    title: "CITROËN DS3",
    subtitle: "Rally de España · Hairpin",
    carSrc: "/carpicture/loeb-citroen-wrc.jpg",
    telemetry: { speed: 62, gear: 2, rpm: 5100, throttle: 40, brake: 70, lapTime: "1:55.902", topSpeed: 188 },
  },
  {
    title: "FORD FIESTA",
    subtitle: "Wales Rally GB · Jump",
    carSrc: "/carpicture/wales-rally-2011-a.jpg",
    telemetry: { speed: 121, gear: 4, rpm: 6900, throttle: 100, brake: 0, lapTime: "1:48.560", topSpeed: 192 },
  },
  {
    title: "CITROËN DS3",
    subtitle: "Wales Rally GB · Crest",
    carSrc: "/carpicture/wales-rally-2011-b.jpg",
    telemetry: { speed: 134, gear: 4, rpm: 7050, throttle: 88, brake: 0, lapTime: "1:46.221", topSpeed: 195 },
  },
  {
    title: "HYUNDAI i20",
    subtitle: "Rally de Portugal · Gravel",
    carSrc: "/carpicture/portugal-2018-i20.jpg",
    telemetry: { speed: 158, gear: 4, rpm: 7400, throttle: 92, brake: 0, lapTime: "1:39.845", topSpeed: 201 },
  },
  {
    title: "FORD FOCUS",
    subtitle: "Gravel Test · Drift",
    carSrc: "/carpicture/ford-focus-wrc.jpg",
    telemetry: { speed: 88, gear: 3, rpm: 5800, throttle: 65, brake: 30, lapTime: "1:52.107", topSpeed: 184 },
  },
  {
    title: "SUBARU WRX",
    subtitle: "ARA · Red Bull Livery",
    carSrc: "/carpicture/Best-Rally-Cars-For-Beginners-Capital-Exotic.webp",
    telemetry: { speed: 102, gear: 3, rpm: 6200, throttle: 78, brake: 20, lapTime: "1:50.633", topSpeed: 187 },
  },
  {
    title: "FORD FIESTA",
    subtitle: "M-Sport · Tarmac Jump",
    carSrc: "/carpicture/formaux.jpg",
    telemetry: { speed: 129, gear: 4, rpm: 6850, throttle: 100, brake: 0, lapTime: "1:44.012", topSpeed: 198 },
  },
  {
    title: "VW POLO R",
    subtitle: "Rally Portugal · Red Bull",
    carSrc: "/carpicture/l-intro-1703889640.jpg",
    telemetry: { speed: 147, gear: 4, rpm: 7300, throttle: 90, brake: 0, lapTime: "1:41.559", topSpeed: 199 },
  },
  {
    title: "SUBARU IMPREZA",
    subtitle: "Cyprus Rally · Solberg",
    carSrc: "/carpicture/Petter_Solberg_-_2006_Cyprus_Rally.jpg",
    telemetry: { speed: 76, gear: 2, rpm: 5400, throttle: 55, brake: 45, lapTime: "1:57.480", topSpeed: 183 },
  },
  {
    title: "FORD PUMA",
    subtitle: "Monte Carlo · Tunnel",
    carSrc: "/carpicture/SI202201200545_news-scaled.jpg",
    telemetry: { speed: 54, gear: 2, rpm: 4800, throttle: 35, brake: 60, lapTime: "1:43.907", topSpeed: 205 },
  },
];

export default function Home() {
  return <Gallery cars={CARS} />;
}
