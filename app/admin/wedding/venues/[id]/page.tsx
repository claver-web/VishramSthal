export default function EditVenuePage({ params }: { params: { id: string } }) {
  return (
    <div className="p-8 animate-fade-in">
      <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-4">Edit Venue</h1>
      <p className="text-gray-500">Venue editing functionality for {params.id} is under construction.</p>
    </div>
  );
}
