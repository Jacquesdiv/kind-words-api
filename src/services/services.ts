import { HttpUtil } from '../utils/http-util';
import { Database, IDatabase } from './../database/database';
import { SentenceService } from './sentence/sentence.service';

export class Services {

  private static _instance: Services;

  public database: IDatabase;
  public http: HttpUtil;

  public sentenceService: SentenceService;

  public static instance(): Services {
    if (!this._instance) { this._instance = new this(); }
    return this._instance;
  }

  private constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    this.http = new HttpUtil();

    this.database = Database.instance();
    await this.database.connect();

    this.sentenceService = new SentenceService(this.database.Sentence);
  }
}
