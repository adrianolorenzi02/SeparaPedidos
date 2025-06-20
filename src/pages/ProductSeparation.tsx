
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Clock, 
  ShoppingCart, 
  Package, 
  X, 
  Circle, 
  Check,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductSeparation = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(5); // Tempo em segundos
  const [cartNumber, setCartNumber] = useState("");

  // Simular o timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Dados mockados do produto
  const orderData = {
    orderNumber: "4539",
    orderId: "337576",
    processedItems: 0,
    totalItems: 34,
    carts: "Nenhum"
  };

  const productData = {
    code: "A/01/03/01",
    name: "AM T COLORE 150G 1.0 JABOTICABA PRETO",
    ean: "789846503491",
    ref: "PF029484",
    quantity: 2
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/")}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="text-center flex-1">
          <p className="text-sm opacity-75">⚠️ 187.19.100.220:32001</p>
        </div>
      </div>

      {/* Order Info */}
      <div className="px-4 mb-6">
        <h1 className="text-2xl font-bold mb-2">
          Pedido Nº: {orderData.orderNumber} - ID: {orderData.orderId}
        </h1>
        
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4" />
          <span className="text-lg">Tempo Decorrido: {formatTime(timer)}s</span>
        </div>

        {/* Cart Input */}
        <div className="bg-white/10 rounded-lg p-4 mb-4">
          <div className="flex gap-2">
            <Input
              placeholder="Nº do Carrinho"
              value={cartNumber}
              onChange={(e) => setCartNumber(e.target.value)}
              className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 h-12"
            />
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 px-6">
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="text-center mb-4">
          <p className="text-sm opacity-75">Carrinhos Utilizados: 
            <span className="text-blue-300 ml-2">{orderData.carts}</span>
          </p>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold">
            Itens Processados: {orderData.processedItems} de {orderData.totalItems}
          </h2>
        </div>
      </div>

      {/* Product Card */}
      <div className="px-4 mb-6">
        <Card className="bg-gradient-to-r from-orange-500 to-yellow-500 border-2 border-orange-400">
          <CardContent className="p-6 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              {productData.code}
            </h3>
            <h4 className="text-lg font-semibold text-white mb-3">
              {productData.name}
            </h4>
            <div className="space-y-2 text-white/90">
              <p><strong>EAN:</strong> {productData.ean}</p>
              <p><strong>Ref:</strong> {productData.ref}</p>
              <p className="text-2xl font-bold mt-4">
                Qtd UN: {productData.quantity}
              </p>
              <Button 
                variant="ghost" 
                className="text-white underline hover:bg-white/10 mt-3"
              >
                Clique aqui para ver estoque
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="px-4 mb-6 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="secondary"
            size="lg"
            className="bg-gray-600 hover:bg-gray-700 text-white h-14"
          >
            <X className="w-5 h-5 mr-2" />
            Não Localizado
          </Button>
          <Button 
            variant="secondary"
            size="lg"
            className="bg-gray-600 hover:bg-gray-700 text-white h-14"
          >
            <Circle className="w-5 h-5 mr-2" />
            Parcial
          </Button>
        </div>
        
        <Button 
          size="lg"
          className="w-full bg-green-600 hover:bg-green-700 text-white h-14"
        >
          <Check className="w-5 h-5 mr-2" />
          Item Separado
        </Button>
      </div>

      {/* Processed Items Section */}
      <div className="px-4 mb-6">
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Itens Processados</h3>
          <div className="text-center py-8">
            <Package className="w-12 h-12 mx-auto text-white/50 mb-3" />
            <p className="text-white/70 italic">Nenhum item processado ainda.</p>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-blue-900/95 backdrop-blur">
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="destructive"
            size="lg"
            className="bg-red-600 hover:bg-red-700 h-14"
            onClick={() => navigate("/")}
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            Cancelar / Devolver Pedido
          </Button>
          <Button 
            size="lg"
            className="bg-gray-600 hover:bg-gray-700 text-white h-14"
          >
            <Check className="w-5 h-5 mr-2" />
            Finalizar Separação do Pedido
          </Button>
        </div>
      </div>

      {/* Bottom spacing for fixed buttons */}
      <div className="h-20"></div>
    </div>
  );
};

export default ProductSeparation;
