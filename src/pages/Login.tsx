
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Lock, 
  Package,
  ChevronDown,
  Eye,
  EyeOff
} from "lucide-react";

const Login = () => {
  const [selectedOperator, setSelectedOperator] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Lista de operadores mockada
  const operators = [
    { id: "001", name: "João Silva", department: "Separação" },
    { id: "002", name: "Maria Santos", department: "Separação" },
    { id: "003", name: "Carlos Oliveira", department: "Expedição" },
    { id: "004", name: "Ana Costa", department: "Separação" },
    { id: "005", name: "Pedro Lima", department: "Conferência" }
  ];

  const handleLogin = () => {
    console.log("Login:", { operator: selectedOperator, password });
    // Aqui será implementada a lógica de autenticação
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Separação</h1>
          <p className="text-gray-600">Sistema de Pedidos</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-xl text-gray-900">
              Acesso ao Sistema
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Seleção de Operador */}
            <div className="space-y-2">
              <Label htmlFor="operator" className="text-sm font-medium text-gray-700">
                Selecionar Operador
              </Label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full h-12 px-4 pr-10 bg-white border border-gray-200 rounded-xl text-left text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center"
                >
                  <User className="w-4 h-4 text-gray-400 mr-3" />
                  <span className={selectedOperator ? "text-gray-900" : "text-gray-500"}>
                    {selectedOperator || "Escolha seu nome"}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 absolute right-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                    {operators.map((operator) => (
                      <button
                        key={operator.id}
                        type="button"
                        onClick={() => {
                          setSelectedOperator(operator.name);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 focus:outline-none focus:bg-blue-50"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{operator.name}</p>
                            <p className="text-sm text-gray-500">{operator.department}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Campo de Senha */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="pl-10 pr-10 h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Botão de Login */}
            <Button
              onClick={handleLogin}
              disabled={!selectedOperator || !password}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Entrar no Sistema
            </Button>

            {/* Link de Ajuda */}
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                Esqueceu sua senha?
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-8">
          Sistema de Separação de Pedidos v1.0
        </p>
      </div>
    </div>
  );
};

export default Login;
