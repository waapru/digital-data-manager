import DigitalDataEnrichment from './DigitalDataEnrichment';

class DigitalDataEnrichmentsCollection {
  constructor(type, trigger, event) {
    this.type = type;
    this.trigger = trigger;
    this.event = event;
    this.enrichments = [];
    this.enrichmentsIndex = {};
  }

  setDigitalData(digitalData) {
    this.digitalData = digitalData;
  }

  getDigitalData() {
    return this.digitalData;
  }

  setDDStorage(ddStorage) {
    this.ddStorage = ddStorage;
  }

  getDDStorage() {
    return this.ddStorage;
  }

  addEnrichment(enrichmentConfig) {
    const prop = enrichmentConfig.prop;
    const handler = enrichmentConfig.handler;
    const options = enrichmentConfig.options;

    const enrichment = new DigitalDataEnrichment(prop, handler, options, this);
    this.enrichments.push(enrichment);
    this.enrichmentsIndex[enrichment.prop] = enrichment;
  }

  getEnrichment(prop) {
    return this.enrichmentsIndex[prop];
  }

  reset() {
    this.enrichments.forEach((enrichment) => {
      enrichment.reset();
    });
  }

  enrich(target, args, direct = false) {
    this.reset();
    this.enrichments.forEach((enrichment) => {
      enrichment.enrich(target, args, direct);
    });
  }
}

export default DigitalDataEnrichmentsCollection;
