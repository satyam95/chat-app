import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import mongoose from "mongoose";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    // Validate senderId and receiverId
    if (
      !senderId ||
      !receiverId ||
      !mongoose.Types.ObjectId.isValid(senderId) ||
      !mongoose.Types.ObjectId.isValid(receiverId)
    ) {
      return res.status(400).json({ error: "Invalid sender or receiver ID" });
    }

    // Find or create conversation
    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = new Conversation({
        participants: [senderId, receiverId],
      });
      await gotConversation.save();
    }

    // Create a new message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    // Add message to conversation
    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
      await gotConversation.save();
    }

    await Promise.all([gotConversation.save(), newMessage.save()]);

    // SOCKET IO
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json({ newMessage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;

    // Validate senderId and receiverId
    if (
      !senderId ||
      !receiverId ||
      !mongoose.Types.ObjectId.isValid(senderId) ||
      !mongoose.Types.ObjectId.isValid(receiverId)
    ) {
      return res.status(400).json({ error: "Invalid sender or receiver ID" });
    }

    // Find the conversation and populate messages
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    return res.status(200).json(conversation.messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
