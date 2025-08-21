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

    /** cvm */
    type Cvm = Common.CommonRecord<{
      /** 主键 */
      id: CommonType.IdType;
      /** cvm主键 */
      cvmId: string;
      /** 名称 */
      name: string;
      /** 运行状态 */
      runningStatus: string;
      /** 地域 */
      location: string;
      /** 可用区 */
      az: string;
      /** 服务器类型 */
      machineType: string;
      /** 操作系统 */
      os: string;
      /** 镜像id */
      imageId: string;
      /** cpu核数 */
      cpu: string;
      /** 内存G */
      memory: string;
      /** 带宽 */
      bandWidth: string;
      /** 主IPv4公网IP */
      ipv4MajorPublic: string;
      /** 主IPv4内网IP */
      ipv4MajorPrivate: string;
      /** 主IPv6地址 */
      ipv6: string;
      /** 系统盘类型 */
      sysDiskType: string;
      /** 系统盘大小(GB) */
      sysDisk: string;
      /** 数据盘_0_类型 */
      dataDisk0Type: string;
      /** 数据盘_0_大小(GB) */
      dataDisk0: string;
      /** 数据盘_1_类型 */
      dataDisk1Type: string;
      /** 数据盘_1_大小(GB) */
      dataDisk1: string;
      /** 数据盘_2_类型 */
      dataDisk2Type: string;
      /** 数据盘_2_大小(GB) */
      dataDisk2: string;
      /** 数据盘_3_类型 */
      dataDisk3Type: string;
      /** 数据盘_3_大小(GB) */
      dataDisk3: string;
      /** 数据盘_4_类型 */
      dataDisk4Type: string;
      /** 数据盘_4_大小(GB) */
      dataDisk4: string;
      /** 所属网络 */
      vpc: string;
      /** 所在子网 */
      vpcSub: string;
      /** 关联vpc */
      relaVpc: string;
      /** CVM创建时间 */
      cvmCreateTime: string;
      /** 计费模式 */
      feeMode: string;
      /** 租户 */
      envTenantId: string;
    }>;

    /** cvm search params */
    type CvmSearchParams = CommonType.RecordNullable<
      Pick<
        Api.Env.Cvm,
        | 'name'
        | 'runningStatus'
        | 'location'
        | 'az'
        | 'machineType'
        | 'os'
        | 'cpu'
        | 'memory'
        | 'ipv4MajorPrivate'
        | 'vpc'
        | 'vpcSub'
        | 'relaVpc'
        | 'envTenantId'
      > &
        Api.Common.CommonSearchParams
    >;

    /** cvm operate params */
    type CvmOperateParams = CommonType.RecordNullable<
      Pick<
        Api.Env.Cvm,
        | 'id'
        | 'cvmId'
        | 'name'
        | 'runningStatus'
        | 'location'
        | 'az'
        | 'machineType'
        | 'os'
        | 'imageId'
        | 'cpu'
        | 'memory'
        | 'bandWidth'
        | 'ipv4MajorPublic'
        | 'ipv4MajorPrivate'
        | 'ipv6'
        | 'sysDiskType'
        | 'sysDisk'
        | 'dataDisk0Type'
        | 'dataDisk0'
        | 'dataDisk1Type'
        | 'dataDisk1'
        | 'dataDisk2Type'
        | 'dataDisk2'
        | 'dataDisk3Type'
        | 'dataDisk3'
        | 'dataDisk4Type'
        | 'dataDisk4'
        | 'vpc'
        | 'vpcSub'
        | 'relaVpc'
        | 'cvmCreateTime'
        | 'feeMode'
        | 'envTenantId'
      >
    >;

    /** cvm list */
    type CvmList = Api.Common.PaginatingQueryRecord<Cvm>;

    /** tenant */
    type Tenant = Common.CommonRecord<{
      /** 主键 */
      id: CommonType.IdType;
      /** 租户名称 */
      name: string;
      /** 租户AppId */
      appId: string;
      /** 租户账号 */
      accountId: string;
      /** 状态（0正常 1停用） */
      status: string;
      /** 删除标志（0代表存在 2代表删除） */
      delFlag: string;
    }>;

    /** tenant search params */
    type TenantSearchParams = CommonType.RecordNullable<
      Pick<Api.Env.Tenant, 'name' | 'appId' | 'accountId' | 'status'> & Api.Common.CommonSearchParams
    >;

    /** tenant operate params */
    type TenantOperateParams = CommonType.RecordNullable<
      Pick<Api.Env.Tenant, 'id' | 'name' | 'appId' | 'accountId' | 'status'>
    >;

    /** tenant list */
    type TenantList = Api.Common.PaginatingQueryRecord<Tenant>;

    /** vpc */
    type Vpc = Common.CommonRecord<{
      /** 主键 */
      id: CommonType.IdType;
      /** vpc主键 */
      vpcId: string;
      /** 名称 */
      name: string;
      /** ipv4_cidr */
      ipv4Cidr: string;
      /** IPv6_cidr */
      ipv6Cidr: string;
      /** 子网 */
      subNetworkNum: string;
      /** 路由表 */
      routeTableNum: string;
      /** NAT网关 */
      natGatewayNum: string;
      /** VPN网关 */
      vpnGatewayNum: string;
      /** 网络ACL */
      networkAclNum: string;
      /** 对等连接 */
      peerConnectionNum: string;
      /** 云主机 */
      cvmNum: string;
      /** 裸金属服务 */
      nakeMachineNum: string;
      /** 专线网关 */
      specialGatewayNum: string;
      /** 默认私有网络 */
      defaultPrivateNetwork: string;
      /** 租户 */
      tenantAppId: string;
      /** 状态（0正常 1停用） */
      status: string;
      /** 删除标志（0代表存在 2代表删除） */
      delFlag: string;
      /** 租户编号 */
      tenantId: string;
    }>;

    /** vpc search params */
    type VpcSearchParams = CommonType.RecordNullable<
      Pick<
        Api.Env.Vpc,
        | 'vpcId'
        | 'name'
        | 'ipv4Cidr'
        | 'ipv6Cidr'
        | 'subNetworkNum'
        | 'routeTableNum'
        | 'natGatewayNum'
        | 'vpnGatewayNum'
        | 'networkAclNum'
        | 'peerConnectionNum'
        | 'cvmNum'
        | 'nakeMachineNum'
        | 'specialGatewayNum'
        | 'defaultPrivateNetwork'
        | 'tenantAppId'
        | 'status'
      > &
        Api.Common.CommonSearchParams
    >;

    /** vpc operate params */
    type VpcOperateParams = CommonType.RecordNullable<
      Pick<
        Api.Env.Vpc,
        | 'id'
        | 'vpcId'
        | 'name'
        | 'ipv4Cidr'
        | 'ipv6Cidr'
        | 'subNetworkNum'
        | 'routeTableNum'
        | 'natGatewayNum'
        | 'vpnGatewayNum'
        | 'networkAclNum'
        | 'peerConnectionNum'
        | 'cvmNum'
        | 'nakeMachineNum'
        | 'specialGatewayNum'
        | 'defaultPrivateNetwork'
        | 'tenantAppId'
        | 'status'
      >
    >;

    /** vpc list */
    type VpcList = Api.Common.PaginatingQueryRecord<Vpc>;

    /** elb */
    type Elb = Common.CommonRecord<{
      /** 主键 */
      id: CommonType.IdType;
      /** elb主键 */
      elbId: string;
      /** 名称 */
      name: string;
      /** ELB状态 */
      elbStatus: string;
      /** 网络类型 */
      networkType: string;
      /** vpc */
      vpc: string;
      /** 实例类型 */
      instanceLevel: string;
      /** 主机名 */
      hostname: string;
      /** ELB创建时间 */
      elbCreateTime: string;
      /** 贷款 */
      publicNetBandwidth: string;
      /** IP地址 */
      ipAddress: string;
      /** 租户 */
      tenantAppId: string;
      /** 状态（0正常 1停用） */
      status: string;
      /** 删除标志（0代表存在 2代表删除） */
      delFlag: string;
      /** 租户编号 */
      tenantId: CommonType.IdType;
    }>;

    /** elb search params */
    type ElbSearchParams = CommonType.RecordNullable<
      Pick<
        Api.Env.Elb,
        | 'elbId'
        | 'name'
        | 'elbStatus'
        | 'networkType'
        | 'vpc'
        | 'instanceLevel'
        | 'hostname'
        | 'elbCreateTime'
        | 'publicNetBandwidth'
        | 'ipAddress'
        | 'tenantAppId'
      > &
        Api.Common.CommonSearchParams
    >;

    /** elb operate params */
    type ElbOperateParams = CommonType.RecordNullable<
      Pick<
        Api.Env.Elb,
        | 'id'
        | 'elbId'
        | 'name'
        | 'elbStatus'
        | 'networkType'
        | 'vpc'
        | 'instanceLevel'
        | 'hostname'
        | 'elbCreateTime'
        | 'publicNetBandwidth'
        | 'ipAddress'
        | 'tenantAppId'
        | 'status'
      >
    >;

    /** elb list */
    type ElbList = Api.Common.PaginatingQueryRecord<Elb>;

    /** oracle */
    type Oracle = Common.CommonRecord<{
      /** 主键 */
      id: CommonType.IdType;
      /** oracle主键 */
      oracleId: string;
      /** 名称 */
      name: string;
      /** 运行状态 */
      runningStatus: string;
      /** 版本 */
      version: string;
      /** 配置 */
      performance: string;
      /** 库空间限额(GB) */
      maxTablespace: string;
      /** 最大IOPS */
      maxIops: string;
      /** 最大IOMB(MB) */
      maxIomb: string;
      /** 角色 */
      role: string;
      /** 可用区 */
      az: string;
      /** 网络 */
      vpc: string;
      /** 租户 */
      tenantAppId: string;
      /** 状态（0正常 1停用） */
      status: string;
      /** 删除标志（0代表存在 2代表删除） */
      delFlag: string;
      /**  */
      tenantId: string;
    }>;

    /** oracle search params */
    type OracleSearchParams = CommonType.RecordNullable<
      Pick<
        Api.Env.Oracle,
        | 'oracleId'
        | 'name'
        | 'runningStatus'
        | 'version'
        | 'performance'
        | 'maxTablespace'
        | 'maxIops'
        | 'maxIomb'
        | 'role'
        | 'az'
        | 'vpc'
        | 'tenantAppId'
      > &
        Api.Common.CommonSearchParams
    >;

    /** oracle operate params */
    type OracleOperateParams = CommonType.RecordNullable<
      Pick<
        Api.Env.Oracle,
        | 'id'
        | 'oracleId'
        | 'name'
        | 'runningStatus'
        | 'version'
        | 'performance'
        | 'maxTablespace'
        | 'maxIops'
        | 'maxIomb'
        | 'role'
        | 'az'
        | 'vpc'
        | 'tenantAppId'
      >
    >;

    /** oracle list */
    type OracleList = Api.Common.PaginatingQueryRecord<Oracle>;

    /** redis */
    type Redis = Common.CommonRecord<{
      /** id */
      id: CommonType.IdType;
      /** redis主键 */
      redisId: string;
      /** 名称 */
      name: string;
      /** 运行状态 */
      runningStatus: string;
      /** 所属项目 */
      project: string;
      /** 地域 */
      location: string;
      /** 可用区 */
      az: string;
      /** 所属网络 */
      vpc: string;
      /** 所在子网 */
      vpcSub: string;
      /** 主IPv4内网IP */
      ipv4: string;
      /** 端口 */
      port: string;
      /** 架构版本 */
      archVersion: string;
      /** 产品版本 */
      productVersion: string;
      /** 租户 */
      tenantAppId: string;
      /** 状态（0正常 1停用） */
      status: string;
      /** 删除标志（0代表存在 2代表删除） */
      delFlag: string;
      /**  */
      tenantId: string;
    }>;

    /** redis search params */
    type RedisSearchParams = CommonType.RecordNullable<
      Pick<
        Api.Env.Redis,
        | 'redisId'
        | 'name'
        | 'runningStatus'
        | 'project'
        | 'location'
        | 'az'
        | 'vpc'
        | 'vpcSub'
        | 'ipv4'
        | 'port'
        | 'archVersion'
        | 'productVersion'
        | 'tenantAppId'
      > &
        Api.Common.CommonSearchParams
    >;

    /** redis operate params */
    type RedisOperateParams = CommonType.RecordNullable<
      Pick<
        Api.Env.Redis,
        | 'id'
        | 'redisId'
        | 'name'
        | 'runningStatus'
        | 'project'
        | 'location'
        | 'az'
        | 'vpc'
        | 'vpcSub'
        | 'ipv4'
        | 'port'
        | 'archVersion'
        | 'productVersion'
        | 'tenantAppId'
      >
    >;

    /** redis list */
    type RedisList = Api.Common.PaginatingQueryRecord<Redis>;

    /** mysql enhance */
    type MysqlEnhance = Common.CommonRecord<{
      /** 主键 */
      id: CommonType.IdType;
      /** mysql主键 */
      mysqlId: string;
      /** 名称 */
      name: string;
      /** 运行状态 */
      runningStatus: string;
      /** 实例类型 */
      instanceLevel: string;
      /** 实例版本 */
      instanceVersion: string;
      /** 地域 */
      location: string;
      /** 规格 */
      performance: string;
      /** 所属网络 */
      vpc: string;
      /** 主IPv4内网IP */
      ipv4MajorPrivate: string;
      /** 端口 */
      port: string;
      /** 计费模式 */
      feeMode: string;
      /** mysql创建时间 */
      mysqlCreateTime: string;
      /** 租户 */
      tenantAppId: string;
      /** 状态（0正常 1停用） */
      status: string;
      /** 删除标志（0代表存在 2代表删除） */
      delFlag: string;
    }>;

    /** mysql enhance search params */
    type MysqlEnhanceSearchParams = CommonType.RecordNullable<
      Pick<
        Api.Env.MysqlEnhance,
        | 'mysqlId'
        | 'name'
        | 'runningStatus'
        | 'instanceLevel'
        | 'instanceVersion'
        | 'location'
        | 'performance'
        | 'vpc'
        | 'ipv4MajorPrivate'
        | 'port'
        | 'feeMode'
        | 'mysqlCreateTime'
        | 'tenantAppId'
      > &
        Api.Common.CommonSearchParams
    >;

    /** mysql enhance operate params */
    type MysqlEnhanceOperateParams = CommonType.RecordNullable<
      Pick<
        Api.Env.MysqlEnhance,
        | 'id'
        | 'mysqlId'
        | 'name'
        | 'runningStatus'
        | 'instanceLevel'
        | 'instanceVersion'
        | 'location'
        | 'performance'
        | 'vpc'
        | 'ipv4MajorPrivate'
        | 'port'
        | 'feeMode'
        | 'mysqlCreateTime'
        | 'tenantAppId'
      >
    >;

    /** mysql enhance list */
    type MysqlEnhanceList = Api.Common.PaginatingQueryRecord<MysqlEnhance>;
  }
}
