import { useEffect, useState } from "react";

import Modal from "../components/common/Modal";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");

  // const load = () => {
  //   setLoading(true);
  //   getContactMessages().then(({ data }) => setMessages(data.data.messages)).finally(() => setLoading(false));
  // };

  // useEffect(() => { load(); }, []);

  const openMsg = (m) => { setSelected(m); setReply(m.adminReply || ""); };
  const saveReply = async (resolved) => {
    await resolveContactMessage(selected._id, { isResolved: resolved, adminReply: reply });
    setSelected(null);
    // load();
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Contact Messages</h1>
        <p className="text-slate-500 text-sm">Queries from website visitors</p>
      </div>

      <div className="space-y-3">
        {loading ? <p className="text-slate-400">Loading...</p> : messages.length === 0 ? (
          <p className="text-slate-400">No messages</p>
        ) : messages.map((m) => (
          <div key={m._id} className={`bg-white rounded-xl p-4 shadow-sm border ${m.isResolved ? "border-slate-100" : "border-amber-200"}`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-slate-800">{m.name}</h3>
                <p className="text-sm text-slate-500">{m.email} {m.phone && `| ${m.phone}`}</p>
                {m.subject && <p className="text-sm font-medium text-slate-700 mt-1">{m.subject}</p>}
                <p className="text-sm text-slate-600 mt-1 line-clamp-2">{m.message}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 text-xs rounded-full ${m.isResolved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  {m.isResolved ? "Resolved" : "Pending"}
                </span>
                <button onClick={() => openMsg(m)} className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">View</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Message Details" size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="text-sm space-y-1">
              <p><span className="text-slate-500">From:</span> <span className="font-medium">{selected.name}</span></p>
              <p><span className="text-slate-500">Email:</span> {selected.email}</p>
              {selected.phone && <p><span className="text-slate-500">Phone:</span> {selected.phone}</p>}
              {selected.subject && <p><span className="text-slate-500">Subject:</span> {selected.subject}</p>}
              <p><span className="text-slate-500">Date:</span> {new Date(selected.createdAt).toLocaleString()}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-700">{selected.message}</div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Admin Reply</label>
              <textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={4} className="w-full px-3 py-2 rounded-lg border border-slate-300" placeholder="Type your reply..." />
            </div>
            <div className="flex gap-2">
              <button onClick={() => saveReply(true)} className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700">Mark Resolved</button>
              <button onClick={() => saveReply(false)} className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg hover:bg-slate-300">Save Draft</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Messages;
