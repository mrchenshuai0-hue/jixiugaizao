import { enterpriseService } from '../services/enterpriseService';
import { personnelService } from '../services/personnelService';
import { vehicleService } from '../services/vehicleService';
import { inspectionService } from '../services/inspectionService';
import { repairRecordService } from '../services/repairRecordService';
import { caseService } from '../services/caseService';
import { personnelPunishmentService } from '../services/personnelPunishmentService';
import { personnelBlacklistService } from '../services/personnelBlacklistService';

/**
 * Unified API Entry Point (Interface Layer)
 * 
 * This layer provides a single point of access for all services.
 * It decouples the frontend components from the underlying service implementations.
 * 
 * In a distributed architecture, this could be replaced by an HTTP client
 * that communicates with remote microservices.
 */
export const api = {
  enterprise: enterpriseService,
  personnel: personnelService,
  vehicle: vehicleService,
  inspection: inspectionService,
  repairRecord: repairRecordService,
  case: caseService,
  personnelPunishment: personnelPunishmentService,
  personnelBlacklist: personnelBlacklistService,
};

export type Api = typeof api;
