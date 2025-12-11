import { Injectable } from '@nestjs/common';
import { RestConnectorService } from './rest-connector.service';
import { IConnector, RestConnectorConfig } from './rest-connector.interface';

@Injectable()
export class ConnectorFactoryService {
  createRestConnector(config: RestConnectorConfig): IConnector {
    return new RestConnectorService(config);
  }
}





