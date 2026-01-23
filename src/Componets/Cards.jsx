export default function Card({ name, email, username, website, company }) {
  return (
    <div className="max-w-sm bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
      <h2 className="text-xl font-bold text-gray-800">{name}</h2>
      <p className="text-gray-600 mt-1">Username: {username}</p>
      <p className="text-gray-500 text-sm mt-1">Email: {email}</p>
      <p className="text-gray-700 mt-1">Company: {company}</p>
      <p className="text-gray-700 mt-4">Website: {website}</p>
      <button className="mt-4 px-4 py-2 text-white rounded-lg bg-[#0a7f8f] hover:bg-[#07666a] transition">
        View Profile
      </button>
    </div>
  );
}
