
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ChevronRight,
  User
} from "lucide-react";

interface Order {
  id: string;
  customer: string;
  items: number;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  time: string;
  date: string;
}

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return {
          label: "Pendente",
          color: "bg-orange-100 text-orange-800",
          icon: Clock
        };
      case "in_progress":
        return {
          label: "Em Andamento",
          color: "bg-blue-100 text-blue-800",
          icon: Package
        };
      case "completed":
        return {
          label: "Concluído",
          color: "bg-green-100 text-green-800",
          icon: CheckCircle
        };
      default:
        return {
          label: "Desconhecido",
          color: "bg-gray-100 text-gray-800",
          icon: AlertCircle
        };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-300";
    }
  };

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card className={`border-l-4 ${getPriorityColor(order.priority)} hover:shadow-md transition-shadow cursor-pointer`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{order.id}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <User className="w-3 h-3" />
                {order.customer}
              </p>
            </div>
          </div>
          
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge className={statusConfig.color}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {statusConfig.label}
            </Badge>
            
            <span className="text-sm text-gray-600">
              {order.items} {order.items === 1 ? 'item' : 'itens'}
            </span>
          </div>

          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{order.time}</p>
            <p className="text-xs text-gray-500">{order.date}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
