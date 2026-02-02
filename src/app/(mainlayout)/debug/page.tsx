import { ProductionApiTest } from '@/components/debug/ProductionApiTest';

export default function DebugPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Debug Center</h1>
        <ProductionApiTest />
      </div>
    </div>
  );
}