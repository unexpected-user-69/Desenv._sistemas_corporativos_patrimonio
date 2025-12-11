import React, { useState } from 'react';
import { UserList } from '../../components/users/UserList';
import { UserForm } from '../../components/users/UserForm';
import { UserView } from '../../components/users/UserView';
import { UserDeleteConfirm } from '../../components/users/UserDeleteConfirm';
import { BulkOperations } from '../../components/users/BulkOperations';
import { User } from '../../types/user';
import { ManagerRoute } from '../../components/auth/ProtectedRoute';

const UsersPageContent: React.FC = () => {
  const [showUserForm, setShowUserForm] = useState(false);
  const [showUserView, setShowUserView] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showBulkOperations, setShowBulkOperations] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleCreateUser = () => {
    setEditingUser(null);
    setShowUserForm(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowUserView(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setShowDeleteConfirm(true);
  };

  const handleFormSuccess = () => {
    setShowUserForm(false);
    setEditingUser(null);
  };

  const handleViewEdit = (user: User) => {
    setShowUserView(false);
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleDeleteSuccess = () => {
    setShowDeleteConfirm(false);
    setSelectedUser(null);
  };

  const handleBulkOperations = () => {
    setShowBulkOperations(true);
  };

  const handleCloseModals = () => {
    setShowUserForm(false);
    setShowUserView(false);
    setShowDeleteConfirm(false);
    setShowBulkOperations(false);
    setSelectedUser(null);
    setEditingUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UserList
          onCreateUser={handleCreateUser}
          onEditUser={handleEditUser}
          onViewUser={handleViewUser}
          onDeleteUser={handleDeleteUser}
          onBulkOperations={handleBulkOperations}
        />

        {/* Modals */}
        <UserForm
          user={editingUser}
          isOpen={showUserForm}
          onClose={handleCloseModals}
          onSuccess={handleFormSuccess}
        />

        <UserView
          user={selectedUser!}
          isOpen={showUserView}
          onClose={handleCloseModals}
          onEdit={handleViewEdit}
        />

        <UserDeleteConfirm
          user={selectedUser!}
          isOpen={showDeleteConfirm}
          onClose={handleCloseModals}
          onSuccess={handleDeleteSuccess}
        />

        <BulkOperations
          isOpen={showBulkOperations}
          onClose={handleCloseModals}
          onSuccess={handleFormSuccess}
        />
      </div>
    </div>
  );
};

export const UsersPage: React.FC = () => {
  return (
    <ManagerRoute>
      <UsersPageContent />
    </ManagerRoute>
  );
};

export default UsersPage;
