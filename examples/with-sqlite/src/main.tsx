import {
	type LumenHost,
	LumenPlugin,
	type SqliteHandle,
} from "@lumen-media/module-sdk";
import { LumenHostProvider, useHost } from "@lumen-media/module-sdk/hooks";
import { useEffect, useState } from "react";

interface Item {
	id: number;
	label: string;
	created_at: number;
}

function ItemsPanel() {
	const host = useHost();
	const [items, setItems] = useState<Item[]>([]);

	useEffect(() => {
		host.data.sqlite().then(async (db) => {
			const rows = await db.query<Item>(
				"SELECT * FROM items ORDER BY created_at DESC",
			);
			setItems(rows);
		});
	}, [host]);

	return (
		<div className="lumen-mod-com-lumen-example-with-sqlite">
			<ul>
				{items.map((item) => (
					<li key={item.id}>{item.label}</li>
				))}
			</ul>
		</div>
	);
}

export default class WithSqlitePlugin extends LumenPlugin {
	private db!: SqliteHandle;
	private host!: LumenHost;

	async onload(host: LumenHost): Promise<void> {
		this.host = host;
		this.db = await host.data.sqlite();

		await this.db.exec(`
			CREATE TABLE IF NOT EXISTS items (
				id         INTEGER PRIMARY KEY AUTOINCREMENT,
				label      TEXT    NOT NULL,
				created_at INTEGER NOT NULL
			)
		`);

		host.panels.add({
			id: "with-sqlite.items",
			slot: "sidebar.left.tabs",
			title: "Items",
			component: () => (
				<LumenHostProvider value={host}>
					<ItemsPanel />
				</LumenHostProvider>
			),
		});

		host.commands.add({
			id: "with-sqlite.add",
			title: "SQLite Example: Add Item",
			run: async () => {
				const label = await host.ui.prompt({
					title: "New item",
					placeholder: "Item label…",
				});
				if (!label) return;
				await this.db.exec(
					"INSERT INTO items (label, created_at) VALUES (?, ?)",
					[label, Date.now()],
				);
				host.ui.notify({ message: `Added: ${label}` });
			},
		});
	}
}
