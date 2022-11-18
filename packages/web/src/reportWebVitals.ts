import type { CLSMetric, Metric, FCPMetric } from "web-vitals";

export default async function reportWebVitals(
    onPerfEntry?: (report: CLSMetric | Metric | FCPMetric) => void
) {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        const { onCLS, onFID, onINP, onFCP, onLCP, onTTFB } = await import(
            "web-vitals"
        );
        console.log(onCLS);
        onCLS(onPerfEntry);
        onFID(onPerfEntry);
        onINP(onPerfEntry);
        onFCP(onPerfEntry);
        onLCP(onPerfEntry);
        onTTFB(onPerfEntry);
    }
}
