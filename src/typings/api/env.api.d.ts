/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  /**
   * namespace Env
   *
   * backend api module: "Env"
   */
  namespace Env {
    /** subsystem */
    type Subsystem = Common.CommonRecord<{
      /** 主键 */
      id: CommonType.IdType;
      /** 名称 */
      name: string;
      /** 英文简称 */
      code: string;
      /** 状态（0正常 1停用） */
      status: string;
      /** 删除标志（0代表存在 2代表删除） */
      delFlag: string;
    }>;

    /** subsystem search params */
    type SubsystemSearchParams = CommonType.RecordNullable<
      Pick<Api.Env.Subsystem, 'name' | 'code' | 'status'> & Api.Common.CommonSearchParams
    >;

    /** subsystem operate params */
    type SubsystemOperateParams = CommonType.RecordNullable<Pick<Api.Env.Subsystem, 'id' | 'name' | 'code' | 'status'>>;

    /** subsystem list */
    type SubsystemList = Api.Common.PaginatingQueryRecord<Subsystem>;

    /** deploy unit */
    type DeployUnit = Common.CommonRecord<{
      /** 主键 */
      id: CommonType.IdType;
      /** 物理子系统代码 */
      subsystemCode: string;
      /** 业务类型 */
      bizType: string;
      /** 部署单元编码 */
      unitCode: string;
      /** 中文名称 */
      chnName: string;
      /** 类型 */
      type: string;
      /** 版本 */
      version: string;
      /** 应用类型 */
      appType: string;
      /** 部署用户 */
      deployUser: string;
      /** 部署目录 */
      deployPath: string;
      /** 进程名称 */
      processName: string;
      /** 进程用途 */
      processPurpose: string;
      /** 使用方式 */
      runType: string;
      /** 是否开机启动 */
      isAutoWhenBoot: string;
      /** 日志目录 */
      logPath: string;
      /** 交易监控日志目录 */
      txLogPath: string;
      /** 启动命令 */
      startCmd: string;
      /** 停止命令 */
      stopCmd: string;
      /** 联系人 */
      contact: string;
      /** 开发人 */
      developer: string;
      /** 基础软件或中间件 */
      baseSoft: string;
      /** 基础软件或中间件的版本 */
      baseSoftVersion: string;
      /** 状态 */
      status: string;
      /** 租户编号 */
      tenantId: CommonType.IdType;
      /** 删除标志 */
      delFlag: string;
    }>;

    /** deploy unit search params */
    type DeployUnitSearchParams = CommonType.RecordNullable<
      Pick<
        Api.Env.DeployUnit,
        | 'subsystemCode'
        | 'bizType'
        | 'unitCode'
        | 'chnName'
        | 'type'
        | 'version'
        | 'appType'
        | 'deployUser'
        | 'deployPath'
        | 'processName'
        | 'processPurpose'
        | 'runType'
        | 'isAutoWhenBoot'
        | 'logPath'
        | 'txLogPath'
        | 'startCmd'
        | 'stopCmd'
        | 'contact'
        | 'developer'
        | 'baseSoft'
        | 'baseSoftVersion'
        | 'status'
      > &
        Api.Common.CommonSearchParams
    >;

    /** deploy unit operate params */
    type DeployUnitOperateParams = CommonType.RecordNullable<
      Pick<
        Api.Env.DeployUnit,
        | 'id'
        | 'subsystemCode'
        | 'bizType'
        | 'unitCode'
        | 'chnName'
        | 'type'
        | 'version'
        | 'appType'
        | 'deployUser'
        | 'deployPath'
        | 'processName'
        | 'processPurpose'
        | 'runType'
        | 'isAutoWhenBoot'
        | 'logPath'
        | 'txLogPath'
        | 'startCmd'
        | 'stopCmd'
        | 'contact'
        | 'developer'
        | 'baseSoft'
        | 'baseSoftVersion'
        | 'status'
      >
    >;

    /** deploy unit list */
    type DeployUnitList = Api.Common.PaginatingQueryRecord<DeployUnit>;
  }
}
