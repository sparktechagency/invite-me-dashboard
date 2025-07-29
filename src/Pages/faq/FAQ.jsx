import { useState } from 'react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { Modal, Input, Button } from 'antd'
import toast from 'react-hot-toast'

import Loader from '../Loader'
import { useCreateFaqMutation, useDeleteFaqMutation, useGetAllFaqQuery, useUpdateFaqMutation } from '../../Redux/faqApis'

const FAQ = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' })
  const [editingFaq, setEditingFaq] = useState(null)
  const [faqToDelete, setFaqToDelete] = useState(null)

  const { data: faqResponse, isLoading, isError, refetch } = useGetAllFaqQuery()
  const [createFaq] = useCreateFaqMutation()
  const [updateFaq] = useUpdateFaqMutation()
  const [deleteFaq] = useDeleteFaqMutation()

  const faqs = faqResponse?.data || []

  if (isLoading) return <Loader />

  if (isError) {
    return (
      <div className="flex justify-center items-center">
        <p>
          Failed to load frequently asked questions. Please try again later.
        </p>
      </div>
    )
  }

  const handleDelete = (id) => {
    setFaqToDelete(id)
    setDeleteModalVisible(true)
  }

  const handleConfirmDelete = async () => {
    try {
      await deleteFaq(faqToDelete).unwrap()

      toast.success('FAQ deleted successfully!')
      setDeleteModalVisible(false)
      setFaqToDelete(null)

      refetch()
    } catch (error) {
      toast.error('Failed to delete FAQ')
      console.error('Delete error:', error)
    }
  }

  const openModal = (faq = null) => {
    setEditingFaq(faq)
    setNewFaq(
      faq
        ? { question: faq.question, answer: faq.answer }
        : { question: '', answer: '' }
    )
    setModalVisible(true)
  }

  const handleSave = async () => {
    try {
      console.log(editingFaq)
      if (editingFaq) {
        await updateFaq({
          id: editingFaq._id,
          ...newFaq,
        }).unwrap()

        toast.success('FAQ updated successfully!')
      } else {
        await createFaq(newFaq).unwrap()
        toast.success('FAQ created successfully!')
      }

      setModalVisible(false)
      setNewFaq({ question: '', answer: '' })
      setEditingFaq(null)

      refetch()
    } catch (error) {
      toast.error(editingFaq ? 'Failed to update FAQ' : 'Failed to create FAQ')
      console.error('Save error:', error)
    }
  }

  return (
    <div>
      <div className="mx-auto p-6 bg-white border-2 border-[#11CD95] rounded-lg mt-5">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold">FAQ Management</h2>
            <p className="text-gray-600 text-sm">
              Manage and update frequently asked questions to assist users in
              finding information easily.
            </p>
          </div>
          <button
            className="p-2 bg-blue-800 text-white rounded-full shadow-md hover:bg-blue-700"
            onClick={() => openModal()}
          >
            <FaPlus size={20} />
          </button>
        </div>
        <div className="space-y-4">
          {faqs.length > 0 ? (
            faqs.map((faq) => (
              <div key={faq._id} className="p-4 border rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    <p className="text-gray-600 text-sm mt-1">{faq.answer}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="p-2 bg-blue-800 text-white rounded shadow-md hover:bg-blue-700"
                      onClick={() => openModal(faq)}
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      className="p-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600"
                      onClick={() => handleDelete(faq._id)}
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4">
              <p className="text-gray-500">
                No FAQs available. Add one to get started!
              </p>
            </div>
          )}
        </div>
      </div>
      <Modal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        centered
        width={700}
      >
        <div className="p-5 ">
          <div className="text-2xl font-bold text-center">
            {editingFaq ? 'Edit FAQ' : 'Add FAQ'}
          </div>
          <p className="text-center text-gray-600">
            Please fill out the details below to{' '}
            {editingFaq ? 'update' : 'add a new'} FAQ.
          </p>
          <label
            htmlFor="question"
            className="font-bold "
            style={{ marginTop: '20px' }}
          >
            Question
          </label>
          <Input
            placeholder="Question"
            className="mb-5 h-[42px]"
            value={newFaq.question}
            onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
          />
          <label htmlFor="answer" className="font-bold">
            Answer
          </label>
          <Input.TextArea
            placeholder="Answer"
            className="mb-5"
            value={newFaq.answer}
            onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
          />
          <Button
            type="primary"
            onClick={handleSave}
            style={{ display: 'block', margin: 'auto' }}
          >
            {editingFaq ? 'Update' : 'Add'} FAQ
          </Button>
        </div>
      </Modal>

      {/* delete faq */}
      <Modal
        open={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onOk={handleConfirmDelete}
        okText="Delete"
        cancelText="Cancel"
        centered
      >
        <div className="p-5">
          <p className="text-center font-bold text-2xl mb-2">Delete FAQ</p>
          <div className="text-center text-red-700 text-xl">
            Are you sure you want to delete this FAQ?
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default FAQ
