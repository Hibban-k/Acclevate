import { programmaticPageRepository } from '@/lib/repositories/programmatic.repository';
import { IProgrammaticPage } from '@/models/ProgrammaticPage';

export class ProgrammaticPageService {
    async getAllPages() {
        return programmaticPageRepository.findAll();
    }

    async getPageById(id: string) {
        return programmaticPageRepository.findById(id);
    }

    async getPageBySlug(slug: string) {
        return programmaticPageRepository.findBySlug(slug);
    }

    async getPageByIndustryAndServiceSlugs(industrySlug: string, serviceSlug: string) {
        return programmaticPageRepository.findByIndustryAndServiceSlugs(industrySlug, serviceSlug);
    }

    async createPage(data: Partial<IProgrammaticPage>) {
        // Auto-generate slug from service + industry slugs if not provided
        // The slug is expected to be passed as "service-slug-industry-slug"
        return programmaticPageRepository.create(data);
    }

    async updatePage(id: string, data: Partial<IProgrammaticPage>) {
        return programmaticPageRepository.update(id, data);
    }

    async deletePage(id: string) {
        return programmaticPageRepository.delete(id);
    }
}

export const programmaticPageService = new ProgrammaticPageService();
