/**
 * Person role label. Charcoal 14px/600 with a short terracotta rule.
 * (Terracotta text is only allowed at 24px+ — CLAUDE.md rule 3 — and is ~4.1:1 on cream.)
 */
const RoleLabel = ({ role }: { role: string }) => (
  <p className="mt-2 inline-flex items-center gap-2 text-small font-semibold text-charcoal">
    <span aria-hidden="true" className="h-[2px] w-5 shrink-0 bg-terracotta" />
    {role}
  </p>
);

export default RoleLabel;
