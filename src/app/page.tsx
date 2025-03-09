'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Teacher = {
  id: number;
  name: string;
  subject: string;
  votes: number;
};

type ChatMessage = {
  content: string;
  senderPseudo: string;
  createdAt: string;
};

export default function Home() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [voted, setVoted] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [pseudo, setPseudo] = useState('');
  const [message, setMessage] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showChat, setShowChat] = useState(false);
  const [showMessageSent, setShowMessageSent] = useState(false);
  const [showVoteSuccess, setShowVoteSuccess] = useState(false);
  const [showVoteError, setShowVoteError] = useState(false);

  const subjectEmojis: { [key: string]: string } = {
    'Sciences de la Vie et de la Terre': '🌱',
    'Anglais LV1': '🇬🇧',
    'Sciences Numériques et Technologie': '💻',
    'Numérique et Sciences Informatiques': '🖥️',
    'Enseignement Scientifique': '🔬',
    'Sciences Économiques et Sociales': '📊',
    'Physique-Chimie': '⚛️',
    'Histoire-Géo, Géopolitique & Sc. Politiques': '🌍',
    'LLC Anglais, Monde contemporain': '📚',
    'Education Physique et Sportive': '🏋️‍♀️',
    'Mathématiques': '➗',
    'Espagnol LV2': '🇪🇸',
    'Enseignement Moral et Civique': '🤝',
    'Management et Gestion': '📈',
    'Chinois LV3': '🇨🇳',
    'Allemand LV2': '🇩🇪',
    'Français': '📖',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teachersRes, voteRes, messagesRes] = await Promise.all([
          fetch('/api/teachers'),
          fetch('/api/user-vote'),
          fetch('/api/messages'),
        ]);
        const [teachersData, voteData, messagesData] = await Promise.all([
          teachersRes.json(),
          voteRes.json(),
          messagesRes.json(),
        ]);
        // S'assurer que teachersData est bien un tableau
        setTeachers(Array.isArray(teachersData) ? teachersData : []);
        setVoted(voteData.voted);
        // S'assurer que messagesData est bien un tableau
        setChatMessages(Array.isArray(messagesData) ? messagesData : []);
      } catch (error) {
        console.error('Impossible de récupérer les données', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredAndSortedTeachers = [...teachers]
      .filter(
        (teacher) =>
          (teacher.name.toLowerCase().includes(search.toLowerCase()) ||
            teacher.subject.toLowerCase().includes(search.toLowerCase())) &&
          (selectedSubject ? teacher.subject === selectedSubject : true)
      )
      .sort((a, b) =>
        sortOrder === 'desc' ? b.votes - a.votes : a.votes - b.votes
      );
    setFilteredTeachers(filteredAndSortedTeachers);
  }, [teachers, search, selectedSubject, sortOrder]);

  const vote = async (teacherId: number) => {
    if (voted) {
      setShowVoteError(true);
      setTimeout(() => setShowVoteError(false), 3000);
      return;
    }

    const res = await fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teacherId }),
    });

    if (res.ok) {
      setVoted(true);
      setTeachers((prev) =>
        prev.map((t) => (t.id === teacherId ? { ...t, votes: t.votes + 1 } : t))
      );
      setShowVoteSuccess(true);
      setTimeout(() => setShowVoteSuccess(false), 3000);
    } else {
      setShowVoteError(true);
      setTimeout(() => setShowVoteError(false), 3000);
    }
  };

  const sendMessage = async () => {
    if (!pseudo.trim() || !message.trim()) return;

    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pseudo, message }),
    });

    if (res.ok) {
      const newMessage = {
        content: message,
        senderPseudo: pseudo,
        createdAt: new Date().toISOString(),
      };
      setChatMessages((prev) => [newMessage, ...prev]);
      setMessage('');
      setShowMessageSent(true);
      setTimeout(() => setShowMessageSent(false), 3000);
    }
  };

  const totalVotes = teachers.reduce((sum, teacher) => sum + teacher.votes, 0);
  const subjects = useMemo(
    () => Array.from(new Set<string>(teachers.map((teacher) => teacher.subject))),
    [teachers]
  );

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="text-center mb-8 relative">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-2"
        >
          🏆 Classement des Professeurs
        </motion.h1>
        <p className="text-gray-400 text-sm">
          Votes anonymes - Lycée Descartes
        </p>

        <div className="absolute top-0 right-0 bg-gray-800 px-4 py-2 rounded-full flex items-center gap-2">
          <span className="text-blue-400">Total :</span>
          <span className="font-bold">{totalVotes}</span>
        </div>
      </div>

      <div className="mb-6 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="🔍 Rechercher un professeur ou matière..."
          className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {subjects.map((subject) => (
          <motion.button
            key={subject}
            whileHover={{ scale: 1.05 }}
            onClick={() =>
              setSelectedSubject(subject === selectedSubject ? '' : subject)
            }
            className={`px-4 py-2 rounded-full flex items-center gap-2 ${
              subject === selectedSubject
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            {subjectEmojis[subject]} {subject}
          </motion.button>
        ))}
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() =>
            setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
          }
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center gap-2"
        >
          {sortOrder === 'desc' ? '▼' : '▲'}
          Trier ({sortOrder === 'desc' ? 'Décroissant' : 'Croissant'})
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {filteredTeachers.map((teacher, index) => {
          const rank =
            sortOrder === 'desc'
              ? index + 1
              : filteredTeachers.length - index;
          const isTop =
            sortOrder === 'desc'
              ? index < 5
              : index >= filteredTeachers.length - 5;

          return (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl ${
                isTop
                  ? 'bg-gradient-to-br from-yellow-600/20 to-yellow-800/20'
                  : 'bg-gray-800'
              } hover:bg-gray-700 transition-colors`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-400 font-bold">{rank}.</span>
                    <h3 className="font-semibold">{teacher.name}</h3>
                  </div>
                  <p className="text-gray-300 text-sm flex items-center gap-2">
                    {subjectEmojis[teacher.subject]} {teacher.subject}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-400">
                    {teacher.votes}
                  </div>
                  {!voted && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => vote(teacher.id)}
                      className="text-sm px-3 py-1 mt-2 bg-blue-600 hover:bg-blue-700 rounded-full relative"
                    >
                      Voter
                      <AnimatePresence>
                        {showVoteSuccess && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 text-xs"
                          >
                            ✓
                          </motion.span>
                        )}
                        {showVoteError && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                          >
                            !
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <footer className="text-center text-gray-500 text-sm mt-12">
        Toutes les données ont été prises dans l&apos;annuaire de l&apos;établissement
      </footer>

      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
          animate={showChat ? 'open' : 'closed'}
          variants={{
            open: { width: 320, height: 500 },
            closed: { width: 56, height: 56 },
          }}
        >
          <button
            onClick={() => setShowChat(!showChat)}
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-700"
          >
            {showChat ? '×' : '💬'}
          </button>

          <AnimatePresence>
            {showChat && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 h-full flex flex-col"
              >
                <h3 className="text-lg font-bold mb-4">Chat en direct</h3>

                <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                  {chatMessages.map((msg) => (
                    <div key={msg.createdAt} className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-blue-300">
                          {msg.senderPseudo}
                        </span>
                        <span className="text-gray-400">
                          {formatTime(msg.createdAt)}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-100">{msg.content}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Votre pseudo"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded-lg"
                  />
                  <div className="flex gap-2">
                    <textarea
                      placeholder="Écrivez un message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1 p-2 bg-gray-700 rounded-lg"
                      rows={2}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={sendMessage}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg relative"
                    >
                      ➔
                      <AnimatePresence>
                        {showMessageSent && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 text-xs"
                          >
                            ✓
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
