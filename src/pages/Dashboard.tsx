import { useMemo } from 'react';
import { Package, AlertTriangle, TrendingDown, Clock } from 'lucide-react';
import { getProducts, getSales } from '@/lib/store';
import { getProductStatus, toINR, parseDate } from '@/lib/helpers';
import { StatusBadge } from '@/components/StatusBadge';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const products = getProducts();
  const sales = getSales();

  const stats = useMemo(() => {
    const totalSKUs = products.length;
    const totalValue = products.reduce((s, p) => s + p.currentStock * p.unitPrice, 0);
    const expired = products.filter(p => getProductStatus(p) === 'EXPIRED').length;
    const lowStock = products.filter(p => getProductStatus(p) === 'LOW_STOCK').length;
    const alerts = expired + lowStock;
    const expiringIn7Days = products.filter(p => {
      const exp = parseDate(p.expiryDate);
      const now = new Date();
      const diff = (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff <= 7;
    }).length;
    return { totalSKUs, totalValue, alerts, lowStock, expired, expiringIn7Days };
  }, [products]);

  const criticalItems = useMemo(() => {
    return products
      .map(p => ({ ...p, status: getProductStatus(p) }))
      .filter(p => p.status !== 'OK')
      .slice(0, 8);
  }, [products]);

  const kpis = [
    { label: 'Total SKUs', value: stats.totalSKUs, icon: Package, mono: true },
    { label: 'Inventory Value', value: toINR(stats.totalValue), icon: TrendingDown, mono: false },
    { label: 'Active Alerts', value: stats.alerts, icon: AlertTriangle, mono: true, alert: stats.alerts > 0 },
    { label: 'Expiring in 7 Days', value: stats.expiringIn7Days, icon: Clock, mono: true, alert: stats.expiringIn7Days > 0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-heading">Dashboard</h1>
        <p className="text-xs text-muted-foreground mt-1">
          {stats.alerts > 0
            ? `System Status: ${stats.alerts} SKU${stats.alerts > 1 ? 's' : ''} require immediate attention.`
            : 'All systems nominal. No alerts.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.2 }}
            className="kpi-card"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{kpi.label}</span>
              <kpi.icon size={16} strokeWidth={1.5} className={kpi.alert ? 'text-status-expired' : 'text-muted-foreground'} />
            </div>
            <p className={`text-2xl font-bold tracking-heading ${kpi.mono ? 'font-mono' : ''}`}>
              {kpi.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div>
        <h2 className="text-sm font-medium tracking-heading mb-3">Critical Items</h2>
        {criticalItems.length === 0 ? (
          <div className="kpi-card text-center py-8">
            <Package size={24} strokeWidth={1.5} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-xs text-muted-foreground">No critical items. All stock levels are healthy.</p>
          </div>
        ) : (
          <div className="border border-border rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="table-header">
                  <th className="text-left p-3 font-medium">Product</th>
                  <th className="text-left p-3 font-medium">SKU</th>
                  <th className="text-right p-3 font-medium">Stock</th>
                  <th className="text-right p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {criticalItems.map(item => (
                  <tr key={item.id} className="border-t border-border hover:bg-secondary/30 transition-colors duration-100">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3 font-mono text-xs text-muted-foreground">{item.sku}</td>
                    <td className="p-3 text-right font-mono">{item.currentStock}</td>
                    <td className="p-3 text-right"><StatusBadge status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
