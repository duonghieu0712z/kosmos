import type { Directive } from 'vue';

function findViewport(root: HTMLElement): HTMLElement {
    return (
        root.querySelector<HTMLElement>('[data-reka-scroll-area-viewport]') ||
        root.querySelector<HTMLElement>('[data-slot="scroll-area-viewport"]') ||
        root.querySelector<HTMLElement>('[data-slot="viewport"]') ||
        root
    );
}

export const vWheelX: Directive<HTMLElement, { invert?: boolean; speed?: number } | undefined> = {
    mounted(el, binding) {
        const viewport = findViewport(el);

        const speed = binding.value?.speed ?? 1;
        const invert = binding.value?.invert ?? false;

        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                return;
            }

            const { scrollWidth, clientWidth, scrollLeft } = viewport;
            const canScroll = scrollWidth > clientWidth;
            if (!canScroll) {
                return;
            }

            const tag = (e.target as HTMLElement)?.closest(
                'input,textarea,select, [contenteditable=""], [contenteditable="true"]',
            );
            if (e.ctrlKey || tag) {
                return;
            }

            const delta = (invert ? -1 : 1) * e.deltaY * speed;
            let next = scrollLeft + delta;
            const max = scrollWidth - clientWidth;
            if (next < 0) {
                next = 0;
            }
            if (next > max) {
                next = max;
            }

            if (next !== scrollLeft) {
                e.preventDefault();
                requestAnimationFrame(() => {
                    viewport.scrollLeft = next;
                });
            }
        };

        viewport.addEventListener('wheel', onWheel, { passive: false });
        (el as any).__wheelXCleanup = () => viewport.removeEventListener('wheel', onWheel);
    },

    unmounted(el) {
        (el as any).__wheelXCleanup?.();
    },
};
