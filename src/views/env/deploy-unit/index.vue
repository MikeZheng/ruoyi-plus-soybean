<script setup lang="tsx">
import { NDivider } from 'naive-ui';
import { fetchBatchDeleteDeployUnit, fetchGetDeployUnitList } from '@/service/api/env/deploy-unit';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDownload } from '@/hooks/business/download';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import ButtonIcon from '@/components/custom/button-icon.vue';
import DeployUnitOperateDrawer from './modules/deploy-unit-operate-drawer.vue';
import DeployUnitSearch from './modules/deploy-unit-search.vue';

defineOptions({
  name: 'DeployUnitList'
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
  apiFn: fetchGetDeployUnitList,
  apiParams: {
    pageNum: 1,
    pageSize: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    subsystemCode: null,
    bizType: null,
    unitCode: null,
    chnName: null,
    type: null,
    version: null,
    appType: null,
    deployUser: null,
    deployPath: null,
    processName: null,
    processPurpose: null,
    runType: null,
    isAutoWhenBoot: null,
    logPath: null,
    txLogPath: null,
    startCmd: null,
    stopCmd: null,
    contact: null,
    developer: null,
    baseSoft: null,
    baseSoftVersion: null,
    status: null,
    params: {}
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'id',
      title: '主键',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'subsystemCode',
      title: '物理子系统代码',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'bizType',
      title: '业务类型',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'unitCode',
      title: '部署单元编码',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'chnName',
      title: '中文名称',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'type',
      title: '类型',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'version',
      title: '版本',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'appType',
      title: '应用类型',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'deployUser',
      title: '部署用户',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'deployPath',
      title: '部署目录',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'processName',
      title: '进程名称',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'processPurpose',
      title: '进程用途',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'runType',
      title: '使用方式',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'isAutoWhenBoot',
      title: '是否开机启动',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'logPath',
      title: '日志目录',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'txLogPath',
      title: '交易监控日志目录',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'startCmd',
      title: '启动命令',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'stopCmd',
      title: '停止命令',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'contact',
      title: '联系人',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'developer',
      title: '开发人',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'baseSoft',
      title: '基础软件或中间件',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'baseSoftVersion',
      title: '基础软件或中间件的版本',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'status',
      title: '状态',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => {
        const divider = () => {
          if (!hasAuth('env:deployUnit:edit') || !hasAuth('env:deployUnit:remove')) {
            return null;
          }
          return <NDivider vertical />;
        };

        const editBtn = () => {
          if (!hasAuth('env:deployUnit:edit')) {
            return null;
          }
          return (
            <ButtonIcon
              text
              type="primary"
              icon="material-symbols:drive-file-rename-outline-outline"
              tooltipContent={$t('common.edit')}
              onClick={() => edit(row.id!)}
            />
          );
        };

        const deleteBtn = () => {
          if (!hasAuth('env:deployUnit:remove')) {
            return null;
          }
          return (
            <ButtonIcon
              text
              type="error"
              icon="material-symbols:delete-outline"
              tooltipContent={$t('common.delete')}
              popconfirmContent={$t('common.confirmDelete')}
              onPositiveClick={() => handleDelete(row.id!)}
            />
          );
        };

        return (
          <div class="flex-center gap-8px">
            {editBtn()}
            {divider()}
            {deleteBtn()}
          </div>
        );
      }
    }
  ]
});

const { drawerVisible, operateType, editingData, handleAdd, handleEdit, checkedRowKeys, onBatchDeleted, onDeleted } =
  useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  const { error } = await fetchBatchDeleteDeployUnit(checkedRowKeys.value);
  if (error) return;
  onBatchDeleted();
}

async function handleDelete(id: CommonType.IdType) {
  // request
  const { error } = await fetchBatchDeleteDeployUnit([id]);
  if (error) return;
  onDeleted();
}

function edit(id: CommonType.IdType) {
  handleEdit('id', id);
}

function handleExport() {
  download('/env/deployUnit/export', searchParams, `部署单元_${new Date().getTime()}.xlsx`);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <DeployUnitSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard title="部署单元列表" :bordered="false" size="small" class="card-wrapper sm:flex-1-hidden">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          :show-add="hasAuth('env:deployUnit:add')"
          :show-delete="hasAuth('env:deployUnit:remove')"
          :show-export="hasAuth('env:deployUnit:export')"
          @add="handleAdd"
          @delete="handleBatchDelete"
          @export="handleExport"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <DeployUnitOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
