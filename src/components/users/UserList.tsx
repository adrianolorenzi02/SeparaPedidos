
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, User } from "lucide-react";

interface User {
  id: string;
  name: string;
  profile: string;
  active: boolean;
}

interface UserListProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}

const UserList = ({ users, onEditUser, onDeleteUser }: UserListProps) => {
  const getProfileName = (profileId: string) => {
    const profiles = {
      admin: "Administrador",
      operator: "Operador",
      supervisor: "Supervisor",
      viewer: "Visualizador"
    };
    return profiles[profileId as keyof typeof profiles] || profileId;
  };

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <Card key={user.id} className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600">{getProfileName(user.profile)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge 
                  variant={user.active ? "default" : "secondary"}
                  className={user.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                >
                  {user.active ? "Ativo" : "Inativo"}
                </Badge>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditUser(user)}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteUser(user.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserList;
