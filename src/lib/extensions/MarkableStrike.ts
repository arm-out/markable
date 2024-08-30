import { Strike } from '@tiptap/extension-strike';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

export const MarkableStrike = Strike.extend({
	addProseMirrorPlugins() {
		const attributes = this.parent?.() || [];

		const showStrikeMarks = new Plugin({
			key: new PluginKey('showStrikeMarks'),
			props: {
				decorations(state) {
					const { doc, selection } = state;
					const decorations: Decoration[] = [];

					doc.descendants((node, pos) => {
						if (node.isText && node.marks.find((mark) => mark.type.name === 'strike')) {
							// Ignore headings
							const parent = doc.resolve(pos).parent;
							if (parent.type.name !== 'heading') {
								const isActive = selection.from >= pos && selection.to <= pos + node.nodeSize;

								if (isActive) {
									decorations.push(
										Decoration.widget(
											pos,
											() => {
												const span = document.createElement('span');
												span.textContent = '~~';
												span.style.color = 'rgba(0, 0, 0, 0.2)';
												return span;
											},
											{ side: -200 }
										),
										Decoration.widget(pos + node.nodeSize, () => {
											const span = document.createElement('span');
											span.textContent = '~~';
											span.style.color = 'rgba(0, 0, 0, 0.2)';
											return span;
										})
									);
								}
							}
						}
					});
					return DecorationSet.create(doc, decorations);
				}
			}
		});

		return [...attributes, showStrikeMarks];
	}
});
