import { Inbox } from 'lucide-react'

/**
 * Generic empty state shown when a content list (projects, publications,
 * certificates, ...) has no items to display.
 */
const EmptyState = ({
  icon: Icon = Inbox,
  title = 'Nothing here yet',
  message = 'New content is on the way. Check back soon!',
  action = null,
}) => (
  <div
    role="status"
    className="w-full max-w-xl mx-auto flex flex-col items-center text-center gap-4 px-6 py-14 rounded-3xl border border-dashed border-white/10 bg-white/[0.02]"
  >
    <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500">
      <Icon size={26} strokeWidth={1.5} />
    </div>
    <h4 className="text-lg font-bold text-white">{title}</h4>
    <p className="text-sm text-slate-400 leading-relaxed max-w-sm">{message}</p>
    {action}
  </div>
)

export default EmptyState

