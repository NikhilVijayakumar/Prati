import React from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export interface FileTreeNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  childrenNodes?: FileTreeNode[];
  secondaryLabel?: string;
}

export interface FileTreeProps {
  nodes: FileTreeNode[];
  expandedIds: Set<string>;
  selectedId: string | null;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
  level?: number;
}

export const FileTree: React.FC<FileTreeProps> = ({
  nodes,
  expandedIds,
  selectedId,
  onToggle,
  onSelect,
  level = 0
}) => {
  return (
    <List component="div" disablePadding>
      {nodes.map((node) => {
        const isExpanded = expandedIds.has(node.id);
        const isSelected = selectedId === node.id;
        const hasChildren = node.childrenNodes?.length;

        return (
          <React.Fragment key={node.id}>
            <ListItemButton
              sx={{ pl: 2 * level + 2 }}
              selected={isSelected}
              onClick={() => (node.type === 'folder' ? onToggle(node.id) : onSelect(node.id))}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                {node.type === 'folder' ? (
                  isExpanded ? (
                    <FolderOpenIcon fontSize="small" />
                  ) : (
                    <FolderIcon fontSize="small" />
                  )
                ) : (
                  <InsertDriveFileIcon fontSize="small" />
                )}
              </ListItemIcon>

              <ListItemText
                primary={node.name}
                secondary={node.secondaryLabel || null}
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption', fontSize: '0.7rem' }}
              />

              {node.type === 'folder' && hasChildren ? (
                isExpanded ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : null}
            </ListItemButton>

            {node.type === 'folder' && hasChildren && (
              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <FileTree
                  nodes={node.childrenNodes!}
                  expandedIds={expandedIds}
                  selectedId={selectedId}
                  onToggle={onToggle}
                  onSelect={onSelect}
                  level={level + 1}
                />
              </Collapse>
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};
