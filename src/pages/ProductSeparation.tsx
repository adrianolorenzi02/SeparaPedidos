
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
  AlertCircle,
  User
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/")}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Separação de Produto</h1>
              <p className="text-sm text-gray-500">Pedido Nº: {orderData.orderNumber}</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">⚠️ 187.19.100.220:32001</p>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Order Info Card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  ID: {orderData.orderId}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600">Tempo: {formatTime(timer)}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Itens Processados</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orderData.processedItems}/{orderData.totalItems}
                </p>
              </div>
            </div>

            {/* Cart Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Número do Carrinho</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Digite o número do carrinho"
                  value={cartNumber}
                  onChange={(e) => setCartNumber(e.target.value)}
                  className="flex-1 h-12 bg-white border-gray-200"
                />
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-6">
                  <ShoppingCart className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Carrinhos Utilizados: <span className="text-blue-600 font-medium">{orderData.carts}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Product Card */}
        <Card className="border-l-4 border-l-orange-500 shadow-sm">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <Package className="w-8 h-8 text-orange-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {productData.code}
                </h3>
                <h4 className="text-lg font-semibold text-gray-700 mb-4">
                  {productData.name}
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500">EAN</p>
                  <p className="font-medium text-gray-900">{productData.ean}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500">Ref</p>
                  <p className="font-medium text-gray-900">{productData.ref}</p>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Quantidade</p>
                <p className="text-3xl font-bold text-orange-600">
                  {productData.quantity} UN
                </p>
              </div>

              <Button 
                variant="ghost" 
                className="text-blue-600 underline hover:bg-blue-50"
              >
                Clique aqui para ver estoque
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline"
              size="lg"
              className="h-14 border-red-200 text-red-600 hover:bg-red-50"
            >
              <X className="w-5 h-5 mr-2" />
              Não Localizado
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="h-14 border-yellow-200 text-yellow-600 hover:bg-yellow-50"
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
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Itens Processados</h3>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 italic">Nenhum item processado ainda.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur border-t border-gray-100">
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline"
            size="lg"
            className="h-14 border-red-200 text-red-600 hover:bg-red-50"
            onClick={() => navigate("/")}
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            Cancelar Pedido
          </Button>
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white h-14"
          >
            <Check className="w-5 h-5 mr-2" />
            Finalizar Separação
          </Button>
        </div>
      </div>

      {/* Bottom spacing for fixed buttons */}
      <div className="h-20"></div>
    </div>
  );
};

export default ProductSeparation;
