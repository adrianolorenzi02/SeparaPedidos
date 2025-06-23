
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Users, 
  Search,
  UserPlus
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserList from "@/components/users/UserList";
import UserForm from "@/components/forms/UserForm";

const UserRegistration = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Dados mockados dos usuários
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "João Silva",
      profile: "admin",
      active: true
    },
    {
      id: "2", 
      name: "Maria Santos",
      profile: "operator",
      active: true
    },
    {
      id: "3",
      name: "Pedro Costa",
      profile: "supervisor",
      active: false
    },
    {
      id: "4",
      name: "Ana Oliveira",
      profile: "viewer",
      active: true
    }
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = (userData: any) => {
    const newUser = {
      id: Date.now().toString(),
      ...userData
    };
    setUsers(prev => [...prev, newUser]);
    setShowForm(false);
    console.log("Novo usuário criado:", newUser);
  };

  const handleEditUser = (user: any) => {
    console.log("Editar usuário:", user);
    // Aqui seria implementada a lógica de edição
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    console.log("Usuário removido:", userId);
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
              <h1 className="text-xl font-bold text-gray-900">Usuários</h1>
              <p className="text-sm text-gray-500">Gerenciar usuários do sistema</p>
            </div>
          </div>
          
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </header>

      <div className="px-4 py-6">
        {showForm ? (
          <UserForm 
            onCancel={() => setShowForm(false)}
            onSubmit={handleAddUser}
          />
        ) : (
          <>
            {/* Search and Add Button */}
            <div className="flex gap-3 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar usuários..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 bg-white border-gray-200"
                />
              </div>
              <Button
                onClick={() => setShowForm(true)}
                className="h-12 bg-blue-600 hover:bg-blue-700 text-white px-4"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Novo Usuário
              </Button>
            </div>

            {/* Users List */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Usuários Cadastrados ({filteredUsers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredUsers.length > 0 ? (
                  <UserList 
                    users={filteredUsers}
                    onEditUser={handleEditUser}
                    onDeleteUser={handleDeleteUser}
                  />
                ) : (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {searchTerm ? "Nenhum usuário encontrado" : "Nenhum usuário cadastrado"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default UserRegistration;
