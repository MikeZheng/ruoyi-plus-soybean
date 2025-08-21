<script setup lang="tsx">
import { useBoolean } from '@sa/hooks';
import { fetchGetMysqlEnhanceList } from '@/service/api/env/mysql-enhance';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDownload } from '@/hooks/business/download';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import ButtonIcon from '@/components/custom/button-icon.vue';
import MysqlEnhanceImportModal from './modules/mysql-enhance-import-modal.vue';
import MysqlEnhanceOperateDrawer from './modules/mysql-enhance-operate-drawer.vue';
import MysqlEnhanceSearch from './modules/mysql-enhance-search.vue';

defineOptions({
  name: 'MysqlEnhanceList'
});

const appStore = useAppStore();
const { download } = useDownload();
const { hasAuth } = useAuth();

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  apiFn: fetchGetMysqlEnhanceList,
  apiParams: {
    pageNum: 1,
    pageSize: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    name: null,
    runningStatus: null,
    instanceLevel: null,
    instanceVersion: null,
    location: null,
    performance: null,
    vpc: null,
    ipv4MajorPrivate: null,
    port: null,
    feeMode: null,
    mysqlCreateTime: null,
    tenantAppId: null,
    params: {}
  },
  columns: () => [
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'mysqlId',
      title: 'mysql主键',
      align: 'center',
      width: 120
    },
    {
      key: 'name',
      title: '名称',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'runningStatus',
      title: '运行状态',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'instanceLevel',
      title: '实例类型',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'instanceVersion',
      title: '实例版本',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'location',
      title: '地域',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'performance',
      title: '规格',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'vpc',
      title: '所属网络',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'ipv4MajorPrivate',
      title: '主IPv4内网IP',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'port',
      title: '端口',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'feeMode',
      title: '计费模式',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'mysqlCreateTime',
      title: 'mysql创建时间',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'tenantAppId',
      title: '租户',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      fixed: 'right',
      render: row => {
        const viewBtn = () => {
          return (
            <ButtonIcon
              text
              type="primary"
              icon="material-symbols:preview"
              tooltipContent={$t('common.view')}
              onClick={() => view(row.id!)}
            />
          );
        };

        return <div class="flex-center gap-8px">{viewBtn()}</div>;
      }
    }
  ]
});
const { drawerVisible, operateType, editingData, handleEdit, checkedRowKeys } = useTableOperate(data, getData);

function view(id: CommonType.IdType) {
  handleEdit('id', id);
}

const { bool: importVisible, setTrue: openImportModal } = useBoolean();

function handleImport() {
  // 导入逻辑
  openImportModal();
}

function handleExport() {
  download('/env/mysqlEnhance/export', searchParams, `mysql增强版_${new Date().getTime()}.xlsx`);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <MysqlEnhanceSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard title="mysql增强版列表" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          :show-add="false"
          :show-delete="false"
          :show-export="hasAuth('env:mysqlEnhance:export')"
          :show-import="hasAuth('env:mysqlEnhance:import')"
          @export="handleExport"
          @refresh="getData"
          @import="handleImport"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="2000"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <MysqlEnhanceImportModal v-model:visible="importVisible" @submitted="getData" />
      <MysqlEnhanceOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
