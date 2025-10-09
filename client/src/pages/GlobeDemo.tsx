import ShippingGlobe from "@/components/ShippingGlobe";
import WebGLErrorBoundary from "@/components/WebGLErrorBoundary";

export default function GlobeDemo() {
  return (
    <div className="min-h-screen bg-slate-900">
      <WebGLErrorBoundary>
        <ShippingGlobe className="w-full h-screen" showUI={true} />
      </WebGLErrorBoundary>
    </div>
  );
}
