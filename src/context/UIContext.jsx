import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Sayfa genelindeki arayüz durumu: açık modal ve toast bildirimi.
 * modal: null | { type: 'contact', subject? } | { type: 'venture', id }
 */
const UIContext = createContext(null);

const TOAST_DURATION = 4500;

export function UIProvider({ children }) {
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const openModal = useCallback((next) => setModal(next), []);
  const closeModal = useCallback(() => setModal(null), []);

  const showToast = useCallback((message) => {
    clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message });
    toastTimer.current = setTimeout(() => setToast(null), TOAST_DURATION);
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const value = useMemo(
    () => ({ modal, openModal, closeModal, toast, showToast }),
    [modal, openModal, closeModal, toast, showToast],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI yalnızca UIProvider içinde kullanılabilir.');
  return context;
}
