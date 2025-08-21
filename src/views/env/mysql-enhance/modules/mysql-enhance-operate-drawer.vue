<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';
import { useDict } from '@/hooks/business/dict';
import { $t } from '@/locales';

defineOptions({
  name: 'MysqlEnhanceOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Env.MysqlEnhance | null;
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { options: envCvmRunningStatusOptions } = useDict('env_cvm_running_status');

const { restoreValidation } = useNaiveForm();
const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: '新增mysql增强版',
    edit: '查看mysql增强版'
  };
  return titles[props.operateType];
});

type Model = Api.Env.MysqlEnhanceOperateParams;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    mysqlId: '',
    name: '',
    runningStatus: '',
    instanceLevel: '',
    instanceVersion: '',
    location: '',
    performance: '',
    vpc: '',
    ipv4MajorPrivate: '',
    port: undefined,
    feeMode: '',
    mysqlCreateTime: '',
    tenantAppId: ''
  };
}

function handleUpdateModelWhenEdit() {
  if (props.operateType === 'add') {
    Object.assign(model, createDefaultModel());
    return;
  }

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

watch(visible, () => {
  if (visible.value) {
    handleUpdateModelWhenEdit();
    restoreValidation();
  }
});

const fieldConfigs = [
  { label: 'mysql主键', key: 'mysqlId' },
  { label: '名称', key: 'name' },
  {
    label: '运行状态',
    key: 'runningStatus',
    formatter: (value: any) => envCvmRunningStatusOptions.value.find(opt => opt.value === value)?.label || '-'
  },
  { label: '实例类型', key: 'instanceLevel' },
  { label: '实例版本', key: 'instanceVersion' },
  { label: '地域', key: 'location' },
  { label: '规格', key: 'performance' },
  { label: '所属网络', key: 'vpc' },
  { label: '主IPv4内网IP', key: 'ipv4MajorPrivate' },
  { label: '端口', key: 'port' },
  { label: '计费模式', key: 'feeMode' },
  { label: 'mysql创建时间', key: 'mysqlCreateTime' },
  { label: '租户', key: 'tenantAppId' }
];
</script>

<template>
  <NDrawer v-model:show="visible" :title="title" display-directive="show" :width="800" class="max-w-90%">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NCard :bordered="false" class="info-card card-wrapper">
        <NSpin :show="false">
          <NDescriptions
            v-for="field in fieldConfigs"
            :key="field.key"
            :column="2"
            bordered
            label-placement="left"
            label-class="w-150px"
          >
            <NDescriptionsItem :label="field.label">{{ model[field.key as keyof Model] || '-' }}</NDescriptionsItem>
          </NDescriptions>
        </NSpin>
      </NCard>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.return') }}</NButton>
        </NSpace>
      </template>
      <!--
 <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem label="mysql主键" path="mysqlId">
          <NInput v-model:value="model.mysqlId" placeholder="请输入mysql主键" />
        </NFormItem>
        <NFormItem label="名称" path="name">
          <NInput v-model:value="model.name" placeholder="请输入名称" />
        </NFormItem>
        <NFormItem label="运行状态" path="runningStatus">
          <NRadioGroup v-model:value="model.runningStatus">
            <NSpace>
              <NRadio
                v-for="option in envCvmRunningStatusOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </NSpace>
          </NRadioGroup>
        </NFormItem>
        <NFormItem label="实例类型" path="instanceLevel">
          <NInput v-model:value="model.instanceLevel" placeholder="请输入实例类型" />
        </NFormItem>
        <NFormItem label="实例版本" path="instanceVersion">
          <NInput v-model:value="model.instanceVersion" placeholder="请输入实例版本" />
        </NFormItem>
        <NFormItem label="地域" path="location">
          <NInput v-model:value="model.location" placeholder="请输入地域" />
        </NFormItem>
        <NFormItem label="规格" path="performance">
          <NInput v-model:value="model.performance" placeholder="请输入规格" />
        </NFormItem>
        <NFormItem label="所属网络" path="vpc">
          <NInput v-model:value="model.vpc" placeholder="请输入所属网络" />
        </NFormItem>
        <NFormItem label="主IPv4内网IP" path="ipv4MajorPrivate">
          <NInput v-model:value="model.ipv4MajorPrivate" placeholder="请输入主IPv4内网IP" />
        </NFormItem>
        <NFormItem label="端口" path="port">
          <NInput v-model:value="model.port" placeholder="请输入端口" />
        </NFormItem>
        <NFormItem label="计费模式" path="feeMode">
          <NInput v-model:value="model.feeMode" placeholder="请输入计费模式" />
        </NFormItem>
        <NFormItem label="mysql创建时间" path="mysqlCreateTime">
          <NInput v-model:value="model.mysqlCreateTime" placeholder="请输入mysql创建时间" />
        </NFormItem>
        <NFormItem label="租户" path="tenantAppId">
          <NInput v-model:value="model.tenantAppId" placeholder="请输入租户" />
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template> 
-->
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
