import { rest } from 'msw';
import { umbDocumentTypeData } from '../data/document-type.data';
import type { DocumentTypeDetails } from '@umbraco-cms/models';

// TODO: add schema
export const handlers = [
	rest.get('/umbraco/backoffice/document-type/:key', (req, res, ctx) => {
		const key = req.params.key as string;
		if (!key) return;

		const document = umbDocumentTypeData.getByKey(key);

		return res(ctx.status(200), ctx.json([document]));
	}),

	rest.post<DocumentTypeDetails[]>('/umbraco/backoffice/document-type/save', (req, res, ctx) => {
		const data = req.body;
		if (!data) return;

		const saved = umbDocumentTypeData.save(data);

		return res(ctx.status(200), ctx.json(saved));
	}),

	rest.get('/umbraco/management/api/v1/tree/document-type/root', (req, res, ctx) => {
		const rootItems = umbDocumentTypeData.getTreeRoot();
		const response = {
			total: rootItems.length,
			items: rootItems,
		};
		return res(ctx.status(200), ctx.json(response));
	}),

	rest.get('/umbraco/management/api/v1/tree/document-type/children', (req, res, ctx) => {
		const key = req.params.key as string;
		if (!key) return;

		const children = umbDocumentTypeData.getTreeItemChildren(key);

		const response = {
			total: children.length,
			items: children,
		};

		return res(ctx.status(200), ctx.json(response));
	}),

	rest.get('/umbraco/management/api/v1/tree/document-type/item', (req, res, ctx) => {
		const keys = req.params.keys as string;
		if (!keys) return;

		const items = umbDocumentTypeData.getTreeItem(keys.split(','));

		return res(ctx.status(200), ctx.json(items));
	}),
];
