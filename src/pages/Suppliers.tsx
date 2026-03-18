import { useState, useCallback } from 'react';
import { getSuppliers, addSupplier, saveSuppliers } from '@/lib/store';
import { seedSuppliers, generateId } from '@/lib/helpers';
import { Truck, Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CATEGORIES } from '@/lib/types';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState(getSuppliers);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', contact: '', email: '', category: '', rating: '4' });

  const refresh = useCallback(() => setSuppliers(getSuppliers()), []);

  const handleSeed = () => {
    saveSuppliers(seedSuppliers());
    refresh();
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category) return;
    addSupplier({
      id: generateId(),
      name: form.name,
      contact: form.contact,
      email: form.email,
      category: form.category,
      rating: Number(form.rating),
    });
    setForm({ name: '', contact: '', email: '', category: '', rating: '4' });
    setOpen(false);
    refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-heading">Suppliers</h1>
          <p className="text-xs text-muted-foreground mt-1">{suppliers.length} registered suppliers</p>
        </div>
        <div className="flex items-center gap-2">
          {suppliers.length === 0 && (
            <Button onClick={handleSeed} variant="outline" className="text-sm border-border text-muted-foreground hover:text-foreground">
              Load Sample Data
            </Button>
          )}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="btn-industrial rounded-md text-sm gap-2">
                <Plus size={16} strokeWidth={1.5} />
                Add Supplier
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border max-w-md">
              <DialogHeader>
                <DialogTitle className="tracking-heading">Add Supplier</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAdd} className="space-y-3">
                <div>
                  <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Company Name</Label>
                  <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="bg-secondary border-border mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Contact</Label>
                    <Input value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} className="bg-secondary border-border mt-1" />
                  </div>
                  <div>
                    <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Email</Label>
                    <Input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="bg-secondary border-border mt-1" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Category</Label>
                    <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                      <SelectTrigger className="bg-secondary border-border mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Rating (1-5)</Label>
                    <Input type="number" min="1" max="5" value={form.rating} onChange={e => setForm(f => ({ ...f, rating: e.target.value }))} className="bg-secondary border-border mt-1 font-mono" />
                  </div>
                </div>
                <Button type="submit" className="w-full btn-industrial rounded-md text-sm">Add Supplier</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {suppliers.length === 0 ? (
        <div className="kpi-card text-center py-12">
          <Truck size={32} strokeWidth={1.5} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">No suppliers registered. Add suppliers or load sample data.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suppliers.map(s => (
            <div key={s.id} className="kpi-card space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-medium">{s.name}</h3>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} strokeWidth={1.5} className={i < s.rating ? 'text-status-overflow fill-status-overflow' : 'text-muted-foreground'} />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{s.category}</p>
              <div className="text-xs font-mono text-muted-foreground space-y-1">
                <p>{s.contact}</p>
                <p>{s.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
