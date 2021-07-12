import { Platform } from "./Platform";

/**
 * This interface declares the properties of a "Project".
 */
export interface Project {

    /**
     * The name of this project
     */
    name: string

    /**
     * The projectId (for bStats)
     */
    id: number

    /**
     * The color for the embed.
     */
    color: string

    /**
     * An optional icon url.
     */
    icon?: string

    /**
     * The platform for which this project was developed
     */
    platform: Platform

    /**
     * The charts to query
     */
    charts?: string[]

}
