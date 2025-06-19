
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Package, 
  Search, 
  Bell, 
  User, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Plus,
  Filter
} from "lucide-react";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { OrderCard } from "@/components/mobile/OrderCard";
import { StatsGrid } from "@/components/mobile/StatsGrid";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Dados mockados para demonstração
  const orders = [
    {
      id: "PED-001",
      customer: "João Silva",
      items: 5,
      status: "pending",
      priority: "high",
      time: "10:30",
      date: "Hoje"
    },
    {
      id: "PED-002", 
      customer: "Maria Santos",
      items: 3,
      status: "in_progress",
      priority: "medium",
      time: "11:15",
      date: "Hoje"
    },
    {
      id: "PED-003",
      customer: "Carlos Oliveira",
      items: 8,
      status: "completed",
      priority: "low",
      time: "09:45",
      date: "Hoje"
    }
  ];

  const stats = [
    { label: "Pendentes", value: "12", color: "text-orange-600", bgColor: "bg-orange-50" },
    { label: "Em Andamento", value: "5", color: "text-blue-600", bgColor: "bg-blue-50" },
    { label: "Concluídos", value: "23", color: "text-green-600", bgColor: "bg-green-50" },
    { label: "Total Hoje", value: "40", color: "text-purple-600", bgColor: "bg-purple-50" }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "all" || order.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader />
      
      {/* Stats Section */}
      <div className="px-4 py-6">
        <StatsGrid stats={stats} />
      </div>

      {/* Search and Filters */}
      <div className="px-4 pb-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar pedido ou cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 bg-white border-gray-200 rounded-xl"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { key: "all", label: "Todos" },
            { key: "pending", label: "Pendentes" },
            { key: "in_progress", label: "Em Andamento" },
            { key: "completed", label: "Concluídos" }
          ].map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.key)}
              className={`whitespace-nowrap rounded-full px-4 ${
                activeFilter === filter.key 
                  ? "bg-blue-600 hover:bg-blue-700" 
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="px-4 pb-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Pedidos ({filteredOrders.length})
          </h2>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 rounded-full">
            <Plus className="w-4 h-4 mr-1" />
            Novo
          </Button>
        </div>

        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Nenhum pedido encontrado</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button 
          size="lg" 
          className="bg-blue-600 hover:bg-blue-700 rounded-full w-14 h-14 shadow-lg"
        >
          <Package className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
