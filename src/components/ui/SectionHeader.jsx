/**
 * Bölüm başlığı: sola dayalı, sıra numarası + ince çizgi + etiket üst satırda;
 * başlık solda, açıklama geniş ekranda sağ sütunda başlıkla aynı tabana oturur.
 * Ortalanmış rozet kalıbı bilinçli olarak kullanılmaz.
 */
export default function SectionHeader({ index, tag, title, description }) {
  return (
    <div className="grid gap-x-12 gap-y-5 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <p className="flex items-center gap-3 text-sm font-semibold">
          {index && <span className="tabular-nums text-accent">{index}</span>}
          <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
          <span className="text-muted">{tag}</span>
        </p>
        <h2 className="mt-5 text-3xl font-extrabold text-balance sm:text-4xl lg:text-[2.6rem]">{title}</h2>
      </div>

      {description && (
        <p className="text-base leading-relaxed text-muted lg:col-span-5 lg:self-end lg:pb-1">{description}</p>
      )}
    </div>
  );
}
