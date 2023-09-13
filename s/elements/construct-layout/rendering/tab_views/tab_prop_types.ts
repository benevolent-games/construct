
import {TemplateResult} from "lit"
import {LayoutMeta} from "../utils/layout_meta.js"

export interface BaseTabProps {
	meta: LayoutMeta
	icon: TemplateResult
	title: string
	active: boolean
	activate: () => void
}

export interface OrdinaryTabProps extends BaseTabProps {
	leaf_id: number
	close: () => void
}

export interface AdderTabProps extends BaseTabProps {}

